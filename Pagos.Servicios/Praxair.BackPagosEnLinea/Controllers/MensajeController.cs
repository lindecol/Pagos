using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Praxair.BackPagosEnLinea.Controllers
{

    public class MensajeController : ApiController
    {
        /// <summary>
        /// Método usado para crear mensajes
        /// </summary>
        /// <param name="sesiones">Listado de objetos del tipo sesión</param>
        /// <param name="asunto">Asunto del mensaje</param>
        /// <param name="mensaje">TextoMensaje</param>
        /// <param name="adjunto">Dirección del archivo adjunto, si no hay archivo el valor del parámetro es string.empty</param>
        /// <param name="usuarioLinde">Usuario que hace el registro</param>
        /// <returns></returns>
        [HttpGet]
        [Route("api/Crear/{sesiones}/{asunto}/{mensaje}/{usuarioLinde}")]
        public bool CrearMensajes(List<Praxair.Negocio.BackPagosEnLinea.Objetos.Sesion> sesiones, string asunto, string mensaje, string adjunto, string usuarioLinde)
        {
            bool salida = false;
            foreach (var s in sesiones)
            {
                if (adjunto == string.Empty)
                    salida = Praxair.Negocio.BackPagosEnLinea.Servicios.CrearMensaje(s.Id, asunto, mensaje, usuarioLinde);
                else
                    salida = Praxair.Negocio.BackPagosEnLinea.Servicios.CrearMensaje(s.Id, asunto, mensaje, adjunto, usuarioLinde);
            }
            return salida;

        }

        /// <summary>
        /// Método usado para enviar mensaje a todos los usuarios del sistema
        /// </summary>
        /// <param name="asunto">Asunto del mensaje</param>
        /// <param name="mensaje">Texto del mensaje</param>
        /// <param name="usuarioLinde">Usuario que hace el registro</param>
        /// <returns></returns>
        [HttpGet]
        [Route("api/CrearBroadCast/{asunto}/{mensaje}/{usuarioLinde}")]
        public bool CrearMensajesBroadCast(string asunto, string mensaje, string usuarioLinde)
        {
            bool salida = false;
            salida = Praxair.Negocio.BackPagosEnLinea.Servicios.CrearMensaje(asunto, mensaje, usuarioLinde);
            return salida;
        }

        /// <summary>
        /// Método que trae los mensajes relacionados con una sesión
        /// </summary>
        /// <param name="idSesion">Identificador de la sesión</param>
        /// <returns>El listado de los mensajes sin leer de la sesión</returns>
        [HttpGet]
        [Route("api/Listar/{idSesion}")]
        public List<Negocio.BackPagosEnLinea.Objetos.Mensaje> ListarMensajes(int idSesion)
        {
            List<Negocio.BackPagosEnLinea.Objetos.Mensaje> salida = new List<Negocio.BackPagosEnLinea.Objetos.Mensaje>();
            salida = Praxair.Negocio.BackPagosEnLinea.Servicios.ListarMensajes(idSesion);
            return salida;
        }

        /// <summary>
        /// Método que cambia el estado de un mensaje a leido
        /// </summary>
        /// <param name="idMensaje">Identificador del mensaje</param>
        /// <returns>True si el mensaje fuer cambiado, de lo contrario false</returns>
        [HttpGet]
        [Route("api/CambiarEstadoMensaje/{idMensaje}")]
        public bool CambiarEstadoMensaje(int idMensaje) {
            bool salida = false;
            var t = HttpContext.Current.Request.Headers.Get("token");

            var u = Negocio.BackPagosEnLinea.Servicios.ObtenerUsuarioIdMensaje(idMensaje);

            var a = new Negocio.BackPagosEnLinea.Utilidades.Token().ValidarToken(u.Usuario, t);
            if (a) {
                salida =  Negocio.BackPagosEnLinea.Servicios.LeerMensaje(idMensaje);
            }
            return salida;
        }
    }
}
