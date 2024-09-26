using ApiReproductorVideos.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace ApiReproductorVideos.Data
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        { 
        }

        public DbSet<Content> Contents { get; set; }
    
    }
}
