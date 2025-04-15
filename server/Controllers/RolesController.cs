using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using server.Data;
using AutoMapper;
using server.Dtos;
using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RolesController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly IMapper _mapper;

        public RolesController(ApplicationDBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        private async Task CreateRolesIfNotExists()
        {
            if (!_context.Roles.Any())
            {
                var roles = new List<Role>
                {
                    new Role { Id = "1", Name = "Admin" },
                    new Role { Id = "2", Name = "Staff" },
                    new Role { Id = "3", Name = "User" },
                    new Role { Id = "4", Name = "LoremIpsum" },
                };
                await _context.Roles.AddRangeAsync(roles);
                await _context.SaveChangesAsync();
            }
        }

        // GET: api/roles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RoleDto>>> GetRoles()
        {
            // Ensure roles are created if they don't exist
            await CreateRolesIfNotExists();
            
            var roles = await _context.Roles.ToListAsync();
            var roleDtos = _mapper.Map<List<RoleDto>>(roles);
            return Ok(roleDtos);
        }

    }
}