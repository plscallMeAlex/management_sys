using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Dtos
{
    public class UserDto
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string UserName { get; set; }
        public string RoleId { get; set; }
    
        public RoleDto Role { get; set; }
    
        public List<UserPermissionDto> UserPermissions { get; set; }
    }
}