using Microsoft.EntityFrameworkCore;
using System.Threading;

namespace PruebaNetby.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Tareas> Tareas { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Usuario>().HasData(
                new Usuario() { UserName = "admin", Password = "1234", Email = "pruebas@hotmail.com", Name = "ADMINISTRADOR" },
                new Usuario() { UserName = "user", Password = "5678", Email = "user@hotmail.com", Name = "Usuario 1" });
        }
    }
}
