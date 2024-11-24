using Api_Tareas_Pendientes.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System.Net;
namespace Api_Tareas_Pendientes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : Controller
    {
        private readonly ApplicationDbContext applicationDbContext;
        string key_password = "pruebas";
        public UsuarioController(ApplicationDbContext aplicationContext)
        {

            this.applicationDbContext = aplicationContext;
        }
        [HttpGet]
        [Route("GetUsuario")]
        public JsonResult GetUsuario(string user,string password)
        {
            Usuario usuario= applicationDbContext.Usuarios.Where(x=> x.UserName== user && x.Password== password).FirstOrDefault();
            if (usuario != null) {
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
