using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Cors;
using System.Web.Mvc;

namespace Praxair.BackPagosEnLinea.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return Redirect("https://www.linde.co/");
        }
    }
}
