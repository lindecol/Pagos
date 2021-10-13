using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Policy;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Praxair.BackPagosEnLinea.Controllers
{
    public class SesionController : ApiController
    {
        /// <summary>
        /// Genera el token a partir de la creación del inicio de sesión
        /// </summary>
        /// <returns>el token creado para iniciar la sesión</returns>
        [HttpGet]
        [Route("api/Token")]
        public string Token()
        {
            string salida = "";
            string usuario = "";
            string password = "";

            try
            {
                usuario = HttpContext.Current.Request.Headers.Get("user");
                password = HttpContext.Current.Request.Headers.Get("pass");

                var t = Praxair.Negocio.BackPagosEnLinea.Servicios.ObtenerToken(usuario, password);

                HttpContext.Current.Response.Headers.Add("token", t);

                return salida;
            }
            catch (Exception ex) {
                Negocio.BackPagosEnLinea.Utilidades.Log.EscribirLog("**.Error: " + ex.ToString());
                return "Error";
            }

            
        }

        /// <summary>
        /// Método que retorna una lista de objetos coincidentes por nombre de usuarop
        /// </summary>
        /// <param name="usuario">Cadena con el nombre de usuario</param>
        /// <returns>Una lista dek tipo Sesion, si tra datos se debe leer la primera posición de lo contrario la lista está vacía</returns>
        [HttpGet]
        [Route("api/ListarSesion/")]
        public Praxair.Negocio.BackPagosEnLinea.Objetos.Sesion ListarSesion(string usuario)
        {
            var usu = Praxair.Negocio.BackPagosEnLinea.Servicios.ObtenerUsuarioCorreo(usuario);

            Praxair.Negocio.BackPagosEnLinea.Objetos.Sesion salida = new Negocio.BackPagosEnLinea.Objetos.Sesion();
            var t = HttpContext.Current.Request.Headers.Get("token");
            var v = new Praxair.Negocio.BackPagosEnLinea.Servicios();

            if (v.ValidarToken(usuario)) {
                {
                    salida = Praxair.Negocio.BackPagosEnLinea.Servicios.ListarSesiones(usu).First();
                }
            }

            
            return salida;
        }

        [HttpPost]
        [Route("api/ListarSesionPost/{usuario}")]
        public Praxair.Negocio.BackPagosEnLinea.Objetos.Sesion ListarSesionPost(string usuario)
        {
            Praxair.Negocio.BackPagosEnLinea.Objetos.Sesion salida = new Negocio.BackPagosEnLinea.Objetos.Sesion();
            var t = HttpContext.Current.Request.Headers.Get("token");
            var v = new Praxair.Negocio.BackPagosEnLinea.Servicios();

            if (v.ValidarToken(usuario))
            {
                {
                    salida = Praxair.Negocio.BackPagosEnLinea.Servicios.ListarSesiones(usuario).First();
                }
            }


            return salida;
        }

        /// <summary>
        /// Método para cambiar el password de un usuario
        /// </summary>
        /// <param name="usuario">Nombre del usuario</param>
        /// <param name="contraseña">Password del usuario</param>
        /// <returns></returns>
        [HttpGet]
        [Route("api/CambiarContraseña/{usuario}/{contraseña}")]
        public bool CambiarContraseña(string usuario, string contraseña) {
            bool salida = false;
            var t = HttpContext.Current.Request.Headers.Get("token");
            //Negocio.BackPagosEnLinea.Utilidades.Log.EscribirLog("Cambiarcontraseña t -> " + t);
            var v = new Praxair.Negocio.BackPagosEnLinea.Servicios();

            if (v.ValidarToken(usuario)) {
                //Negocio.BackPagosEnLinea.Utilidades.Log.EscribirLog("CambiarContraseña Token validado");
                return v.ActualizarPassword(usuario, contraseña);
            }
            //Negocio.BackPagosEnLinea.Utilidades.Log.EscribirLog("CambiarContraseña Token sin validadar");
            return salida;
        }


        /// <summary>
        /// Método usado para autenticar en el sistema
        /// </summary>
        /// <param name="usuario"></param>
        /// <param name="pais"></param>
        /// <returns>el token autenticado</returns>
        [HttpGet]
        [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
        [Route("api/Autenticar/{usuario}/{pais}")]
        public Negocio.BackPagosEnLinea.Objetos.Token Autenticar(string usuario, int pais) {
            
            var password = HttpContext.Current.Request.Headers.Get("password");
            var salida = Praxair.Negocio.BackPagosEnLinea.Servicios.Autenticar(usuario, password, pais);
            if (salida.VToken.Equals("")){
                HttpContext.Current.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                HttpContext.Current.Response.StatusDescription = "Credenciales no autorizadas";
                HttpContext.Current.Response.End();
            }
            return salida;
        }

        /// <summary>
        /// Método usado para autenticar en el sistema
        /// </summary>
        /// <param name="usuario"></param>
        /// <param name="pais"></param>
        /// <returns>el token autenticado</returns>
        [HttpPost]
        [Route("api/AutenticarPost/{correo}/{pais}")]
        [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
        public Negocio.BackPagosEnLinea.Objetos.Token AutenticarPost(string correo, int pais)
        {
            var usuario = Praxair.Negocio.BackPagosEnLinea.Servicios.ObtenerUsuarioCorreo(correo);
            //var pais = credencial.Pais;

            var password = HttpContext.Current.Request.Headers.Get("password");
            var salida = Praxair.Negocio.BackPagosEnLinea.Servicios.Autenticar(usuario, password, pais);
            if (salida.VToken.Equals(""))
            {
                HttpContext.Current.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                HttpContext.Current.Response.StatusDescription = "Credenciales no autorizadas";
                HttpContext.Current.Response.End();
            }
            return salida;
        }

        /// <summary>
        /// Método usado para autenticar en el sistema
        /// </summary>
        /// <param name="usuario"></param>
        /// <param name="pais"></param>
        /// <returns>el token autenticado</returns>
        [HttpGet]
        [Route("api/CorreoCambio/{usuario}")]
        public string CorreoCambio(string usuario)
        {
            return Praxair.Negocio.BackPagosEnLinea.Servicios.ReenviarLinkCambioPass (usuario);
        }

        /// <summary>
        /// Método para crear una sesión en el sistema de pagoa
        /// </summary>
        /// <param name="usuario">usuario a crear</param>
        /// <param name="password">contraseña</param>
        /// <param name="pais">1=Colombia, 2=Ecuador, 3=venezuela, 4=Panamá</param>
        /// <returns>True si la creación fue efectiva, de lo contrario false</returns>
        [HttpGet]
        [Route("api/CrearSesion/{usuario}/{password}/{pais}")]
        public bool CrearSesion(string usuario, string password, int pais) {
            var correo = HttpContext.Current.Request.Headers.Get("correo");

            if (correo != null)
            {
                if (!correo.Equals(""))
                    return Negocio.BackPagosEnLinea.Servicios.CrearSesion(usuario, password, pais, correo);
                else
                    return false;
            }
            else {
                return false;
            }
                
        }
    }
}
