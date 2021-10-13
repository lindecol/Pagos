using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace Praxair.CambioContraseña.Controllers
{
    public class HomeController : Controller
    {

        public ActionResult Index(string mensaje)
        {
            ViewData.Add("mensaje", mensaje);
            return View();
        }

        public ActionResult MostrarInformacion(string mensaje)
        {
            var salida = Praxair.Negocio.BackPagosEnLinea.Servicios.Mensaje(mensaje);
            var m = salida.Split(';');
            var n = "";
            if (m.Length == 3)
            {
                var s = Praxair.Negocio.BackPagosEnLinea.Servicios.ValidarToken(m[0], m[1]);
                n = m[0] + ":" + m[1];

                if (s)
                {
                    TimeSpan t = TimeSpan.Parse(m[2]);
                    if (t.Add(new TimeSpan(0, 30, 0)) < DateTime.Now.TimeOfDay)
                    {
                        n = "La Validación del token es incorrecto";
                    }
                }
                else
                {
                    n = "La Validación del token es incorrecto";
                }
            }
            else {
                n = "La Validación del token es incorrecto";
            }
            return base.Json(n, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Accion(string usuario, string pass, string token)
        {
            var usu =Praxair.Negocio.BackPagosEnLinea.Servicios.ObtenerUsuarioCorreo(usuario);
            var tok = token;


            var url = System.Configuration.ConfigurationManager.AppSettings["008"] + usu + @"/" + pass;
            var request = (HttpWebRequest)WebRequest.Create(url);
            request.Method = "GET";
            request.ContentType = "application/json";
            request.Accept = "application/json";
            request.Headers.Add("token", tok);

            try
            {
                using (WebResponse response = request.GetResponse())
                {
                    using (Stream strReader = response.GetResponseStream())
                    {
                        if (strReader == null)
                            return base.Json("vacia", JsonRequestBehavior.AllowGet);
                        using (StreamReader objReader = new StreamReader(strReader))
                        {
                            string responseBody = objReader.ReadToEnd();
                            if (responseBody.Equals("false"))
                                return base.Json("repetida", JsonRequestBehavior.AllowGet);
                        }
                    }
                }
                return base.Json("ok", JsonRequestBehavior.AllowGet);
            }
            catch (WebException ex)
            {
                return base.Json("error", JsonRequestBehavior.AllowGet);
            }
        }
    }
}