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
    public class IdentifyingAreasController : Controller
    {
        public IdentifyingAreasController() 
        {
            if (!FileHelper.CallNumFileExists())
            {
                FileHelper.CreateCallNumFile();
            }

            if (!FileHelper.MScoreFileExists())
            {
                FileHelper.CreateMatchingScoreFile();
            }
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Game()
        {
            return View();
        }

        public List<JSKeyValueModel> GetCallNums() 
        {
            Dictionary<string, string> callNums = FileHelper.GetKeyValuePairs();

            Random rnd = new Random();

            List<int> randomNums = new List<int>();

            //generate 7 unique random numbers
            while (randomNums.Count <= 7)
            {
                int n = rnd.Next(0, 10);

                if (!randomNums.Contains(n))
                {
                    randomNums.Add(n);
                }
            }

            //use list of key value objs for JS use
            List<JSKeyValueModel> jsret = new List<JSKeyValueModel>();

            foreach (int num in randomNums)
            {
                jsret.Add(new JSKeyValueModel { Key = $"{num}00", Value = callNums.GetValueOrDefault($"{num}00") });
            }

            return jsret;
        }


        //post method for saving user score
        [HttpPost]
        public IActionResult SaveScore(HighScoreModel s)
        {
            FileHelper.AddMatchingScore(s);
            return RedirectToAction("HighScores");
        }

        //highscore page
        public IActionResult HighScores()
        {
            return View(FileHelper.GetMatchingScores().OrderByDescending(x => x.Score));
        }
    }
}
