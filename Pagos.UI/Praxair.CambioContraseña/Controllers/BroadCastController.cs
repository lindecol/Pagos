using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Praxair.CambioContraseña.Controllers
{
    public class BroadCastController : Controller
    {
        // GET: BroadCast
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult ListarSesiones()
        {
            List<Negocio.BackPagosEnLinea.Objetos.Sesion> salida = new List<Negocio.BackPagosEnLinea.Objetos.Sesion>();
            salida = Praxair.Negocio.BackPagosEnLinea.Servicios.ListarSesiones();
            return base.Json(salida, JsonRequestBehavior.AllowGet);
        }

        private string NombreArchivo(string adjunto) {
            int idx = -1;
            string salida = ""; 

            idx = adjunto.LastIndexOf(@"\");
            salida = adjunto.Substring(idx + 1);

            salida = salida.Replace(" ", string.Empty);
            salida = salida.Replace(" ", string.Empty);
            salida = salida.Replace(" ", string.Empty);


            return salida;
        }

        public ActionResult CrearMensajes(List<Negocio.BackPagosEnLinea.Objetos.Sesion> sesiones, string asunto, string mensaje, string adjunto, string usuarioLinde)
        {
            bool salida = false;

            var directorio = Path.Combine(Server.MapPath("~/UploadedFiles/"));
            var arc = "";

            if (adjunto != string.Empty)
                arc = directorio + NombreArchivo(adjunto);
            else
                arc = "";

            foreach (var s in sesiones)
            {
                if (arc.Equals(string.Empty))
                    salida = Praxair.Negocio.BackPagosEnLinea.Servicios.CrearMensaje(s.Id, asunto, mensaje, usuarioLinde);
                else
                    salida = Praxair.Negocio.BackPagosEnLinea.Servicios.CrearMensaje(s.Id, asunto, mensaje, arc, usuarioLinde);
            }
            return base.Json(salida, JsonRequestBehavior.AllowGet);

        }

        public ActionResult CrearMensajesBroadCast(string asunto, string mensaje, string adjunto, string usuarioLinde)
        {
            bool salida = false;
            List<Negocio.BackPagosEnLinea.Objetos.Sesion> s = new List<Negocio.BackPagosEnLinea.Objetos.Sesion>();
            s = Praxair.Negocio.BackPagosEnLinea.Servicios.ListarSesiones();


            foreach (var c in s) {
                var directorio = Path.Combine(Server.MapPath("~/UploadedFiles/"));
                var arc = "";

                if (adjunto != string.Empty)
                {
                    arc = directorio + NombreArchivo(adjunto);
                    salida = Praxair.Negocio.BackPagosEnLinea.Servicios.CrearMensaje(c.Id, asunto, mensaje, arc, usuarioLinde);
                }
                else
                { 
                    salida = Praxair.Negocio.BackPagosEnLinea.Servicios.CrearMensaje(c.Id, asunto, mensaje, usuarioLinde);
                }
            }
            
            return base.Json(salida, JsonRequestBehavior.AllowGet);
        }

        public ActionResult ListarMensajes(int idSesion)
        {
            List<Negocio.BackPagosEnLinea.Objetos.Mensaje> salida = new List<Negocio.BackPagosEnLinea.Objetos.Mensaje>();
            salida = Praxair.Negocio.BackPagosEnLinea.Servicios.ListarMensajes(idSesion);
            return base.Json(salida, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult CargarArchivo()
        {
            var mensaje = "";
            try
            {
                if (base.Request.Files != null)
                {
                    if (base.Request.Files.Count > 0)
                    {
                        string _FileName = Path.GetFileName(base.Request.Files[0].FileName);
                        string _path = Path.Combine(Server.MapPath("~/UploadedFiles/"), _FileName);
                        base.Request.Files[0].SaveAs(_path.Replace(' ', '_'));
                    }
                    ViewBag.Message = "Proceso de cargue de Novedades iniciado con éxito";
                }
                else
                {
                    ViewBag.Message = "No hay archivo para cargar";
                }
                mensaje = ViewBag.Message;

                return base.Json(mensaje);
            }
            catch
            {
                ViewBag.Message = "Error en el inicio del proceso de cargue de novedades";
                mensaje = ViewBag.Message;
                return base.Json(mensaje);
            }
        }



    }
}