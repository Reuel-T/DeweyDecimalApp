using DeweyDecimalApp.Helpers;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DeweyDecimalApp.Controllers
{
    public class IdentifyingAreasController : Controller
    {
        public IdentifyingAreasController() 
        {
            if (!FileHelper.CallNumFileExists())
            {
                FileHelper.CreateCallNumFile();
            }
        }

        public IActionResult Index()
        {
            return View();
        }

        public Dictionary<string, string> GetCallNums() 
        {
            Dictionary<string, string> callNums = FileHelper.GetKeyValuePairs();
      
            return callNums;
        } 
    }
}
