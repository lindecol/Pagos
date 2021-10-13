using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;

namespace Praxair.CambioContraseña.Controllers
{
    public class MultipagoController : Controller
    {
        private string _referencia;
        private string _monto;

        public ActionResult Index(string objeto)
        {
            double suma = 0;
            var m = Regex.Replace(objeto, @"\r\n", string.Empty);
            m = m.Replace("},{", "*");
            m = m.Replace("[", "");
            m = m.Replace("]", "");
            m = m.Replace("{", "");
            m = m.Replace("}", "");
            m = m.Replace("checked", "check");
            m = m.Replace("\"EmpId\"", "EmpId");
            m = m.Replace("\"Documento\"", "Documento");
            m = m.Replace("\"Monto\"", "Monto");
            m = m.Replace("\"Porcentaje\"", "Porcentaje");
            m = m.Replace("\"check\"", "check");

            var lista = m.Split('*');
            int i = 1;
            var objetos = CargarObjeto(lista);
            var empid = "";
            foreach (var o in objetos)
            {
                if (i == 1) {
                    _referencia = o.Documento;
                }
                suma += o.Monto;
                empid = o.EmpId.ToString();
                
                var s = Praxair.Negocio.BackPagosEnLinea.Servicios.RegistrarPagoPrincipalMultipago(o.Documento, o.Monto, _referencia);
                i++;
            }
            _monto = suma.ToString();
            //var url = string.Format(@"/Pago/Index?monto={0}&referencia={1}&empId={2}&mp=t", _monto, _referencia, empid);
            var url = string.Format("../IU/Pago/Index?monto={0}&referencia={1}&empId={2}&mp=t", _monto, _referencia, empid);
            return Redirect(url); 
        }

        private List<Praxair.Negocio.BackPagosEnLinea.Objetos.Grilla> CargarObjeto(string[] pagos)
        {
            List<Praxair.Negocio.BackPagosEnLinea.Objetos.Grilla> s = new List<Negocio.BackPagosEnLinea.Objetos.Grilla>();
            foreach (var p in pagos)
            {
                var j = "{" + p + "}";
                Praxair.Negocio.BackPagosEnLinea.Objetos.Grilla g = new Negocio.BackPagosEnLinea.Objetos.Grilla();
                g = JsonConvert.DeserializeObject<Praxair.Negocio.BackPagosEnLinea.Objetos.Grilla>(j);
                //if (g.Porcentaje == g.Monto
                s.Add(g);
            }
            return s;
        }
    }
}
