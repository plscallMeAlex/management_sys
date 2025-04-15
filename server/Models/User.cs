using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class User
    {
        public string Id { get; set; } = String.Empty;
        public string FirstName { get; set; } = String.Empty;
        public string LastName { get; set; } = String.Empty;
        public string Email { get; set; } = String.Empty;
        public string? Phone { get; set; }
        public string UserName { get; set; } = String.Empty;
        public string Password { get; set; } = String.Empty;
        
        public string? RoleId { get; set; }
        public Role? Role { get; set; } = null;

        public ICollection<UserPermission> UserPermissions { get; set; } = new List<UserPermission>();
    }
}