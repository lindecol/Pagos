using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Praxair.CambioContraseña.Controllers
{
    public class EnvioController : Controller
    {
        // GET: Envio
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Accion(string usuario) {
            string salida = "";
            salida =  Praxair.Negocio.BackPagosEnLinea.Servicios.ReenviarLinkCambioPass(usuario);
            return base.Json(salida, JsonRequestBehavior.AllowGet);
        }
    }
}