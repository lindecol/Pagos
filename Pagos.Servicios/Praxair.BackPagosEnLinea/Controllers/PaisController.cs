using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Praxair.BackPagosEnLinea.Controllers
{
    public class PaisController : ApiController
    {
        /// <summary>
        /// Listado de paises asociados en el sistema
        /// </summary>
        [HttpGet]
        //[EnableCors(origins: "http://localhost:4200/", headers: "*", methods: "*")]
        [Route("api/Listar/")]
        public List<Praxair.Negocio.BackPagosEnLinea.Objetos.Pais> Listar() {
            return Praxair.Negocio.BackPagosEnLinea.Servicios.ListarPaises();
        }
    }
}
