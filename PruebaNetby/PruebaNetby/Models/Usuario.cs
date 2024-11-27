using System.ComponentModel.DataAnnotations;

namespace PruebaNetby.Models
{
    public class Usuario
    {
        [Key]
        public string? UserName { get; set; }
        public string? Password { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
    }
}
