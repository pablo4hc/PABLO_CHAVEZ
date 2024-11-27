using Microsoft.AspNetCore.Mvc;
using PruebaNetby.Models;

namespace PruebaNetby.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        private readonly ApplicationDbContext applicationDbContext;
        string key_password = "pruebas";
        public UsuarioController(ApplicationDbContext aplicationContext)
        {

            this.applicationDbContext = aplicationContext;
        }
        [HttpGet]
        [Route("GetUsuario")]
        public JsonResult GetUsuario(string user, string password)
        {
            Usuario usuario = applicationDbContext.Usuarios.Where(x => x.UserName == user && x.Password == password).FirstOrDefault();
            if (usuario != null)
            {
                return Json(new
                {
                    mensaje = "Usuario Ok",
                    error = 1,
                });
            }
            else
            {
                return Json(new
                {
                    mensaje = "Credenciales incorrectas",
                    error = 2,
                });
            }
        }
    }
}
