using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Dtos
{
    public class UserPermissionDto
    {
        public string PermissionId { get; set; } = string.Empty;
        public string UserId { get; set; } = string.Empty;

        public PermissionDto Permission { get; set; } = null!;
    }
}