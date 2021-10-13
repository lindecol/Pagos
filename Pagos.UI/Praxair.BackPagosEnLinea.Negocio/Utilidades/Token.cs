using System;
using System.Collections.Generic;
using System.Text;

namespace Praxair.Negocio.BackPagosEnLinea.Utilidades
{
    class Token
    {
        private Guid _g;
        public Token()
        {
            _g = Guid.NewGuid();
        }

        public string ObtenerToken() {
            return _g.ToString();
        }
        
        
    }
}
