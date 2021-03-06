using Microsoft.EntityFrameworkCore;
using ScaleHit.API.Models;

namespace ScaleHit.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options){}

        public DbSet<Value> Values { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<Scale> Scales { get; set; }
    }
}