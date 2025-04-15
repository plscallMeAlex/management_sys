using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class UserPermission
    {
        public string UserId { get; set; } = String.Empty;
        public User User { get; set; } = null!;

        public string PermissionId { get; set; } = String.Empty;
        public Permission Permission { get; set; } = null!;
    }
}