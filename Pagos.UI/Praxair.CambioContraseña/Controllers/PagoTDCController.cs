using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Praxair.CambioContraseña.Controllers
{
    public class PagoTDCController : Controller
    {
        private const int IdPago = 2;
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

        public ActionResult RealizarPagoTDC(string correo, string tdc, int cvc, int mes, int anho, string nombre, int cuotas, string monto, string referencia )
        {
            bool salida = false;
            salida = Praxair.Negocio.BackPagosEnLinea.Servicios.RealizarPagoTDC (correo, tdc, cvc, mes, anho, nombre, cuotas, monto, referencia);
            return base.Json(salida, JsonRequestBehavior.AllowGet);
        }
    }
}