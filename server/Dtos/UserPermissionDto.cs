using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Dtos
{
    public class UserPermissionDto
    {
        public string PermissionId { get; set; }
        public string UserId { get; set; }
    
        public PermissionDto Permission { get; set; }
    }
}