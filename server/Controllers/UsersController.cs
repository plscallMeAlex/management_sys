using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Dtos;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly IMapper _mapper;

        public UsersController(ApplicationDBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        // GET: api/users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            var users = await _context.Users
                .Include(u => u.Role)
                .Include(u => u.UserPermissions)
                    .ThenInclude(up => up.Permission)
                .ToListAsync();

            // Map the users to UserDto
            var userDtos = _mapper.Map<List<UserDto>>(users);

            return Ok(userDtos);
        }

        // GET: api/users/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(string id)
        {
            var user = await _context.Users
                .Include(u => u.Role)
                .Include(u => u.UserPermissions)
                    .ThenInclude(up => up.Permission)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
                return NotFound();

            // Map the user to UserDto
            var userDto = _mapper.Map<UserDto>(user);

            return Ok(userDto);
        }

        // POST: api/users
        [HttpPost]
        public async Task<ActionResult<User>> CreateUser([FromBody] CreateUserDto dto)
        {
            var roleExists = await _context.Roles.AnyAsync(r => r.Id == dto.RoleId);
            if (!roleExists)
                return NotFound($"Role with ID '{dto.RoleId}' not found."); 

            if (dto.PermissionIds != null && dto.PermissionIds.Any())
            {
                var validPermissionIds = await _context.Permissions
                    .Where(p => dto.PermissionIds.Contains(p.Id))
                    .Select(p => p.Id)
                    .ToListAsync();

                var missingPermissions = dto.PermissionIds.Except(validPermissionIds).ToList();
                if (missingPermissions.Any())
                    return NotFound($"Permissions not found: {string.Join(", ", missingPermissions)}");
            }

            var user = _mapper.Map<User>(dto); // Map CreateUserDto to User

            // Attach permissions
            if (dto.PermissionIds != null && dto.PermissionIds.Any())
            {
                foreach (var permissionId in dto.PermissionIds)
                {
                    user.UserPermissions.Add(new UserPermission
                    {
                        UserId = user.Id,
                        PermissionId = permissionId
                    });
                }
            }

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var createdUser = await _context.Users
                .Include(u => u.Role)
                .Include(u => u.UserPermissions)
                .ThenInclude(up => up.Permission)
                .FirstOrDefaultAsync(u => u.Id == user.Id);

            var userDto = _mapper.Map<UserDto>(createdUser); // Map to UserDto for response

            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, userDto);
        }


        // PUT: api/users/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(string id, [FromBody] UpdateUserDto dto)
        {
            if (id != dto.Id)
                return BadRequest("User ID mismatch.");

            var existingUser = await _context.Users
                .Include(u => u.Role)
                .Include(u => u.UserPermissions)
                .ThenInclude(up => up.Permission)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (existingUser == null)
                return NotFound();

            var roleExists = await _context.Roles.AnyAsync(r => r.Id == dto.RoleId);
            if (!roleExists)
                return NotFound($"Role with ID '{dto.RoleId}' not found.");

            if (dto.PermissionIds != null && dto.PermissionIds.Any())
            {
                var validPermissionIds = await _context.Permissions
                    .Where(p => dto.PermissionIds.Contains(p.Id))
                    .Select(p => p.Id)
                    .ToListAsync();

                var missingPermissions = dto.PermissionIds.Except(validPermissionIds).ToList();
                if (missingPermissions.Any())
                    return NotFound($"Permissions not found: {string.Join(", ", missingPermissions)}");
            }

            _mapper.Map(dto, existingUser);

            if (dto.PermissionIds != null)
            {
                _context.UserPermissions.RemoveRange(existingUser.UserPermissions);

                foreach (var permissionId in dto.PermissionIds)
                {
                    existingUser.UserPermissions.Add(new UserPermission
                    {
                        UserId = id,
                        PermissionId = permissionId
                    });
                }
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Users.Any(u => u.Id == id))
                    return NotFound();

                throw;
            }

            return Ok(_mapper.Map<UserDto>(existingUser));
        }


        // DELETE: api/users/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound();

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        // POST Order: api/users/DataTable
        [HttpPost("DataTable")]
        public async Task<ActionResult<OrderResponseDto>> CreateOrderTB([FromBody] OrderDto dto)
        {
            var user = await _context.Users
                .Include(u => u.Role)
                .Include(u => u.UserPermissions)
                .ThenInclude(up => up.Permission)
                .FirstOrDefaultAsync(u => u.Id == dto.OrderBy);
                
            if (user == null)
                return NotFound($"User with ID '{dto.OrderBy}' not found.");
            
            var userDtos = _mapper.Map<List<UserDto>>(new List<User> { user });

            var response = new OrderResponseDto{
                DataSource = userDtos,
                Page = dto.PageNumber,
                PageSize = dto.PageSize,
                TotalCount = dto.PageSize
            };

            return Ok(response);
        }
    }
}