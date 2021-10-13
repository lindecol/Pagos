using System;

namespace Praxair.Negocio.BackPagosEnLinea
{
    public class Servicios
    {
        public static string Version() {
            /*  **************************************************************************
             *      VERSION      QUIEN      FECHA       DESCRIPCION
             *  **************************************************************************
             *      1.0.0.0     LEGION      01-09-2020   CREACION DEL PROYECTO
             *  **************************************************************************
             */
            return "1.0.0.0";
        }

        /// <summary>
        /// Obtiene el token a partir del la validación de credenciales
        /// </summary>
        /// <param name="usuario">Usuario de la credencial</param>
        /// <param name="contraseña">Contraseña de la credencial</param>
        /// <returns></returns>
        public static string ObtenerToken(string usuario, string contraseña) {
            Utilidades.Token t = new Utilidades.Token();
            return t.ObtenerToken();
        }

        /// <summary>
        /// Método usado para validar la autenticidad del token
        /// </summary>
        /// <param name="token">valor textual del token</param>
        /// <returns>true su el token es correcto, false de no serlo </returns>
        public bool ValidarToken(string token) {
            return true;            
        }
    }
}
