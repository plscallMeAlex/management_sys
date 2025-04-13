using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Data
{
    public class ApplicationDBContext: DbContext
    {
        public ApplicationDBContext (DbContextOptions dbContextOptions): base(dbContextOptions)
        {

        }
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; } = null!;
        public DbSet<Permission> Permissions { get; set; } = null!;
    }
}