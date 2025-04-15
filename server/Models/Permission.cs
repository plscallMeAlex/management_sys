using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class Permission
    {
        public string Id { get; set; } = String.Empty;
        public string PermissionName { get; set; } = String.Empty;
        public bool IsReadable { get; set; } = false;
        public bool IsWritable { get; set; } = false;
        public bool IsDeletable { get; set; } = false;

        public ICollection<UserPermission> UserPermissions { get; set; } = new List<UserPermission>();
    }
}