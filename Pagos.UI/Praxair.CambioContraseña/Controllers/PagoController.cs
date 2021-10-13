using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;

namespace Praxair.CambioContraseña.Controllers
{
    public class PagoController : Controller
    {
        private string _referencia;
        private string _monto;

        // GET: Pago
        public ActionResult Index(string monto, string referencia, string empId, string mp = "")//Por favor revisar
        {
            
            ViewBag.Monto = monto;
            ViewBag.Referencia = referencia;
            ViewBag.empId = empId;
            ViewBag.mp = mp;
            return View();
        }

        public ActionResult GuardarPagoPrincipal(string referencia, double monto) {
            bool salida = false;
            salida = Praxair.Negocio.BackPagosEnLinea.Servicios.RegistrarPagoPrincipal(referencia, monto);
            return base.Json(salida, JsonRequestBehavior.AllowGet);
        }

        public ActionResult ObtenerValorAPagar(string referencia, double monto, string empId) {
            double salida = 0;

            var s = Praxair.Negocio.BackPagosEnLinea.Servicios.RegistrarPagoPrincipal(referencia, monto);

            if (s) {
                salida = Praxair.Negocio.BackPagosEnLinea.Servicios.ObtenerValorAPagar(referencia, monto);
                if (salida == 0)
                    salida = monto;
            }
            return base.Json(salida, JsonRequestBehavior.AllowGet);
        }

        public ActionResult ObtenerConsecutivoPago(string referencia, double monto)
        {
            double salida = 0;
            salida = Praxair.Negocio.BackPagosEnLinea.Servicios.ObtenerConsecutivo(referencia, monto);
            return base.Json(salida, JsonRequestBehavior.AllowGet);
        }

        public ActionResult RegistrarPago(string transaccion, string referencia, string monto) {
            return base.Json(0, JsonRequestBehavior.AllowGet);
        }

        public ActionResult ListarCargoPago()
        {
            var salida = Praxair.Negocio.BackPagosEnLinea.Servicios.ListaCargoPago();
            return base.Json(salida, JsonRequestBehavior.AllowGet);
        }

        public ActionResult ListarValorCargoPago(int id, double valor)
        {
            var salida = Praxair.Negocio.BackPagosEnLinea.Servicios.ObtenerNuevoValor(id, valor);
            return base.Json(salida, JsonRequestBehavior.AllowGet);
        }

        public ActionResult RegistrarPagoDetalle(string documento, double valor)
        {
            //var id = Praxair.Negocio.BackPagosEnLinea.Servicios.ObtenerIdSesionDocumento(documento);
            var refe = documento;
            documento = "";
            bool salida = false;
            bool esMultiPago = false;

            //esMultiPago = Praxair.Negocio.BackPagosEnLinea.Servicios.EsDocumentoMultipago(documento);

            //if (!esMultiPago)
            salida = Praxair.Negocio.BackPagosEnLinea.Servicios.RegistrarPagoDetalle(documento, refe, valor);
            //else

            return base.Json(salida, JsonRequestBehavior.AllowGet);
        }



        
    }
}