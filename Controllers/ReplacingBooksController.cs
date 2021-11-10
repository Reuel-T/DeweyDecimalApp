using DeweyDecimalApp.DataStructs;
using DeweyDecimalApp.Helpers;
using DeweyDecimalApp.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DeweyDecimalApp.Controllers
{
    public class ReplacingBooksController : Controller
    {
        public ReplacingBooksController() 
        {
            if (!FileHelper.ScoreFileExists())
            {
                FileHelper.CreateFile();
            }
        }

        [HttpGet]
        public List<string> GenerateCallNos()
        {
            string period = "";
            Random rnd = new Random();
            CLinkedList<BookModel> books = new CLinkedList<BookModel>();

            for (int i = 0; i < 10; i++)
            {
                //generate a random number 1 >= n <= 999
                int number = rnd.Next(1, 1000);

                //generate a random number between 1 and 10
                int pCheck = rnd.Next(1, 11);

                //30 % chance for addition to call number
                if (pCheck > 8)
                {
                    period = $".{rnd.Next(1, 1000)}";
                }

                string author = RandomString(3);

                BookModel b = new BookModel($"{number.ToString().PadLeft(3, '0')}{period} {author}");

                books.Append(b);
            }

            books.QuickSort(books.Head);

            List<string> callnums = new List<string>();
            foreach (BookModel book in books)
            {
                callnums.Add(book.CallNumber);
            }

            return callnums;
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
        //post method for saving user score
        [HttpPost]
        public IActionResult SaveScore(HighScoreModel s)
        {
            FileHelper.AddScore(s);
            return RedirectToAction("HighScores");
        }

        //highscore page
        public IActionResult HighScores()
        {
            return View(FileHelper.GetScores().OrderByDescending(x => x.Score));
        }

        //returns view with game
        public IActionResult Game()
        {
            return View();
        }

    }
}
