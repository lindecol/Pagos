using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Praxair.CambioContraseña.Controllers
{
    public class PagoPSEController : Controller
    {
        // GET: PagoPSE
        private const int IdPago = 1;
        public ActionResult Index(string monto, string referencia)
        {

            //float porcentajeTipo = 0;
            //int montoTipo = 0;
            //var lista = Praxair.Negocio.BackPagosEnLinea.Servicios.ListaCargoPago().Where(x => x.Id == IdPago).ToList();

            //if (lista.Count == 0)
            {
                ViewBag.Monto = (double.Parse(monto) / 100).ToString();
                ViewBag.Referencia = referencia;
            }
            /*else {
                porcentajeTipo = 1 + lista.First().ComisionP;
                montoTipo = lista.First().ComisionV;
                ViewBag.Monto = (((double.Parse(monto) / 100) * porcentajeTipo) + montoTipo).ToString();
                ViewBag.Referencia = referencia;
            }*/
            return View();
        }

        public ActionResult RealizarPagoPSE(string correo, int tipoUsuario, string tipoId, string identificacion, string banco, string observacion, string monto, string referencia)
        {
            bool salida = false;
            salida = Praxair.Negocio.BackPagosEnLinea.Servicios.RealizarPagoPSE(correo, tipoUsuario, tipoId, identificacion, banco, observacion, monto, referencia);
            return base.Json(salida, JsonRequestBehavior.AllowGet);
        }
    }
}