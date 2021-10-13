using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Praxair.BackPagosEnLinea.Controllers
{
    public class VersionController : ApiController
    {
        /// <summary>
        /// Método que retorna la versión del sistema Praxair.BackPagosEnLinea
        /// </summary>
        /// <returns>String(a.b.c.d)</returns>
        [HttpGet]
        public String Version() {
            return Praxair.Negocio.BackPagosEnLinea.Servicios.Version();
        }

        /// <summary>
        /// Método que permite validar la conectividad con la base de datos
        /// </summary>
        /// <returns>True si la conectividad es correcta, de lo contrario false</returns>
        [HttpGet]
        [Route("api/Ping")]
        public bool Ping() {
            return Praxair.Negocio.BackPagosEnLinea.Servicios.Ping();
        }
    }
}
