using System.ComponentModel.DataAnnotations;

namespace PruebaNetby.Models
{
    public class Tareas
    {
        [Key]
        public int Id { get; set; }
        public string Titulo { get; set; }
        public string Descripcion { get; set; }
        public DateTime Fecha_creacion { get; set; }
        public DateTime Fecha_vencimiento { get; set; }
        public int Completada { get; set; }
        public int Estado { get; set; }
    }
}
