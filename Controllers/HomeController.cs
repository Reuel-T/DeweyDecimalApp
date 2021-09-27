using DeweyDecimalApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace DeweyDecimalApp.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public List<string> GenerateCallNos() 
        {
            Random rnd = new Random();
            List<string> books = new List<string>();

            for (int i = 0; i < 10; i++)
            {
                //generate a random number 1 >= n <= 999
                int number = rnd.Next(1, 1000);
                string period = $".{rnd.Next(1, 1000)}";
                string author = RandomString(3);

                books.Add($"{number.ToString().PadLeft(3, '0')}{period} {author}");
            }

            books.Sort();

            return books;
        }

        public IActionResult Index()
        {
            List<string> callnums = GenerateCallNos();
            string jsonCallnums = JsonSerializer.Serialize(callnums);
            ViewBag.JSONcallnums = jsonCallnums;
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        //https://stackoverflow.com/questions/1344221/how-can-i-generate-random-alphanumeric-strings
        // Generates a random string with a given size.    
        public string RandomString(int size)
        {
            Random rnd = new Random();

            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            return new string(Enumerable.Repeat(chars, size)
              .Select(s => s[rnd.Next(s.Length)]).ToArray());

        }
    }
}
