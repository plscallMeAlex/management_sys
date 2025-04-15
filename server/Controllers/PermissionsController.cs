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
    public class PermissionsController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly IMapper _mapper;

        public PermissionsController(ApplicationDBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        private async Task CreatePermissionsIfNotExists()
        {
            if (!_context.Permissions.Any())
            {
                var permissions = new List<Permission>
                {
                    new Permission { Id = "1", PermissionName = "SuperAdmin", IsDeletable = true, IsReadable = true, IsWritable = true },
                    new Permission { Id = "2", PermissionName = "Admin", IsDeletable = false, IsReadable = true, IsWritable = true },
                    new Permission { Id = "3", PermissionName = "Employee", IsDeletable = false, IsReadable = true, IsWritable = false },
                    new Permission { Id = "4", PermissionName = "Lorem Ipsum" , IsDeletable = false, IsReadable = false, IsWritable = false },
                };
                await _context.Permissions.AddRangeAsync(permissions);
                await _context.SaveChangesAsync();
            }
        }

        // GET: api/permissions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PermissionDto>>> GetPermissions()
        {
            // Ensure permissions are created if they don't exist
            await CreatePermissionsIfNotExists();
            
            var permissions = await _context.Permissions.ToListAsync();
            var permissionDtos = _mapper.Map<List<ResponsePermissionDto>>(permissions);
            return Ok(permissionDtos);
        }
    }
}