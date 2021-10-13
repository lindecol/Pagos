using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace Praxair.CambioContraseña.Controllers
{
    public class DetallePagoController : Controller
    {
        private string _id;
        // GET: DetallePago
        public ActionResult Index(string env, string id)
        {
            _id = id;
            ViewBag.Transaccion = id;
            ViewBag.Referencia = "";
            ViewBag.Monto = 0;
            ViewBag.Meta = "Sin éxito";

            var url = @"https://sandbox.wompi.co/v1/transactions/" + id;

            //LlamadoAsync(url);
            Llamado(url);
            return View();
        }

        private string Llamado(string url)
        {
            string refe;
            string salida = "";
            double monto = 0;
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(url);
            string urlParameters = "";

            int idxPar = url.IndexOf('?');
            if (idxPar > 0)
            {
                urlParameters = url.Substring(idxPar);
            }
            try
            {
                System.Net.ServicePointManager.SecurityProtocol = System.Net.SecurityProtocolType.Tls12;
                HttpResponseMessage response = client.GetAsync(urlParameters).Result;

                if (response.IsSuccessStatusCode)
                {
                    salida = response.Content.ReadAsStringAsync().Result;
                    refe = ValorReferencia(salida);
                    monto = double.Parse(ValorMonto(salida)) / 100;

                    if (ValorStatus(salida) == "APPROVED")
                    {
                        Praxair.Negocio.BackPagosEnLinea.Servicios.RegistrarPagoDetalle(_id, refe, monto);

                        ViewBag.Referencia = refe;
                        ViewBag.Monto = monto;
                        ViewBag.Meta = "Transaccion existosa";
                    }
                    else {
                        Praxair.Negocio.BackPagosEnLinea.Servicios.RegistrarPagoDetalle(_id, refe, 0);
                        ViewBag.Referencia = refe;
                        ViewBag.Monto = monto;
                        ViewBag.Meta = "Transaccion no existosa, comuniquese con su proveedor de operaciones";

                    }


                    
                }
            }
            catch (Exception ex) {
                salida = "";
            }
            
            return salida;
        }

        private string ValorStatus(string mensaje)
        {
            string salida = "";
            int indiceI = -1;
            int indiceF = -1;

            indiceI = mensaje.IndexOf("status");

            if (indiceI > 0)
            {
                indiceI += 8;
                indiceF = mensaje.Substring(indiceI).IndexOf(',');
                salida = mensaje.Substring(indiceI, indiceF);
                salida = salida.Replace('"', ' ').Trim();
            }
            return salida;
        }

            

        private string ValorReferencia(string mensaje) {
            string salida = "";
            int indiceI = -1;
            int indiceF = -1;

            indiceI = mensaje.IndexOf("reference");

            if (indiceI > 0) {
                indiceI += 11;
                indiceF = mensaje.Substring(indiceI).IndexOf(',');
                salida = mensaje.Substring(indiceI, indiceF);
                salida = salida.Replace('"', ' ').Trim();
            }
            return salida;
        }

        private string ValorMonto(string mensaje)
        {
            string salida = "";
            int indiceI = -1;
            int indiceF = -1;

            indiceI = mensaje.IndexOf("amount_in_cents");

            if (indiceI > 0)
            {
                indiceI += 17;
                indiceF = mensaje.Substring(indiceI).IndexOf(',');
                salida = mensaje.Substring(indiceI, indiceF);
                salida = salida.Replace('"', ' ').Trim();
            }
            return salida;
        }
    }
}