using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Dtos
{
    public class UserDto
    {
        public string Id { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public string RoleId { get; set; } = string.Empty;

        public RoleDto Role { get; set; } = new();

        public List<UserPermissionDto> UserPermissions { get; set; } = new();
    }
}