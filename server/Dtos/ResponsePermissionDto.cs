using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Dtos
{
    public class ResponsePermissionDto
    {
        public string Id { get; set; } = string.Empty;
        public string PermissionName { get; set; } = string.Empty;
        public bool IsReadable { get; set; } = false;
        public bool IsWritable { get; set; } = false;
        public bool IsDeletable { get; set; } = false;
        
    }
}