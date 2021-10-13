using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Praxair.CambioContraseña.Controllers
{
    public class CrearUsuarioController : Controller
    {
        // GET: CrearUsuario
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult CrearUsuario(string mail, string usuario, string pais, string empresa, string identificacion) {
            var salida =  Praxair.Negocio.BackPagosEnLinea.Servicios.CrearUsuario(mail, usuario, pais, empresa, identificacion);
            var envio = Praxair.Negocio.BackPagosEnLinea.Servicios.ReenviarLinkCambioPass(mail);
            return base.Json(salida, JsonRequestBehavior.AllowGet);
        }
    }
}