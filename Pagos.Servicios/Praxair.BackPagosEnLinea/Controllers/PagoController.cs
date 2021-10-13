using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Praxair.BackPagosEnLinea.Controllers
{
    public class PagoController : ApiController
    {
        /// <summary>
        /// Listado de pagos por empresa
        /// </summary>
        [HttpGet]
        [Route("api/ListarGeneralPagos/")]
        public List<Praxair.Negocio.BackPagosEnLinea.Objetos.PagoGeneral> ListarGeneralPagos(int empId, string fInicial = "", string fFinal = "", string documento = "", string nit = "")
        {
            if (documento == null)
                documento = "";
            return Praxair.Negocio.BackPagosEnLinea.Servicios.ObtenerGeneralDePagos(empId, fInicial, fFinal, documento, nit);
        }


        [HttpGet]
        [Route("api/ObtenerValorAPagar/")]
        public double ObtenerValorAPagar(string referencia, double monto) {
            return Praxair.Negocio.BackPagosEnLinea.Servicios.ObtenerValorAPagar(referencia, monto);
        }

        [HttpGet]
        [Route("api/ObtenerCargaPago/")]
        public List<Praxair.Negocio.BackPagosEnLinea.Objetos.CargoPago>  ObtenerCargaPago()
        {
            return Praxair.Negocio.BackPagosEnLinea.Servicios.ListaCargoPago();
        }

        [HttpGet]
        [Route("api/ObtenerNit/")]
        public Praxair.Negocio.BackPagosEnLinea.Objetos.ObjetoNit  ObtenerNit(string usuario)
        {
            var usu = Praxair.Negocio.BackPagosEnLinea.Servicios.ObtenerUsuarioCorreo(usuario) ;

            return Praxair.Negocio.BackPagosEnLinea.Servicios.ObtenerNit(usu);
        }


    }
}
