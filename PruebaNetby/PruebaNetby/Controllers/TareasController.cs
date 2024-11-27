using Microsoft.AspNetCore.Mvc;
using PruebaNetby.Models;

namespace PruebaNetby.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TareasController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        private readonly ApplicationDbContext applicationDbContext;
        public TareasController(ApplicationDbContext aplicationContext)
        {
            this.applicationDbContext = aplicationContext;
        }
        [HttpGet]
        [Route("GetTareas")]
        public List<Tareas> GetTareas()
        {
            return applicationDbContext.Tareas.Where(x => x.Estado == 1).ToList();
        }
        [HttpPost]
        [Route("AddTarea")]
        public JsonResult AddTarea(Tareas tarea)
        {
            try
            {
                string response = string.Empty;
                applicationDbContext.Tareas.Add(tarea);
                applicationDbContext.SaveChanges();
                return Json(new
                {
                    mensaje = "Registro Guardado",
                    error = 1,
                });
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    mensaje = ex.Message,
                    error = 2,
                });
            }


        }
        [HttpPut]
        [Route("UpdateTarea")]
        public JsonResult UpdateTarea(Tareas tarea)
        {
            try
            {
                applicationDbContext.Entry(tarea).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                applicationDbContext.SaveChanges();
                return Json(new
                {
                    mensaje = "Registro Actualizado",
                    error = 1,
                });
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    mensaje = ex.Message,
                    error = 2,
                });
            }
        }
        [HttpPut]
        [Route("EliminarTarea")]
        public JsonResult EliminarTarea(Tareas tarea)
        {
            try
            {
                applicationDbContext.Entry(tarea).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                applicationDbContext.SaveChanges();
                return Json(new
                {
                    mensaje = "Registro Eliminado",
                    error = 1,
                });
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    mensaje = ex.Message,
                    error = 2,
                });
            }
        }
    }
}
