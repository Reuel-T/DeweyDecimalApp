﻿using DeweyDecimalApp.Helpers;
using DeweyDecimalApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DeweyDecimalApp.Controllers
{
    public class FindingCallNumbersController : Controller
    {
        public FindingCallNumbersController() 
        {
            //creates tree data file if it does not exist
            if (!FileHelper.TreeGameDataExists())
            {
                FileHelper.CreateTreeDataFile();
            }

            //creates the score file
            if (!FileHelper.TreeGameScoresExists())
            {
                FileHelper.CreateTreeScoreFile();
            }

            //loads the tree to a static value, better than reading the tree file every single time
            if (TreeHolder.Tree == null)
            {
                TreeHolder.Tree = FileHelper.GetTree();
            }
        }
        
        
        // GET: FindingCallNumbersController
        public ActionResult Game()
        {
            return View();
        }


        //test method after I realised a flaw in the app :)
        public List<List<DeweyPair>> Test() 
        {
            
            List<DeweyPair> path = TreeHolder.Tree.GetPathToRandom(TreeHolder.Tree.Root, 3);
            List<DeweyPair> children = TreeHolder.Tree.GetChildren(path[1]);

            List<DeweyPair> options = new List<DeweyPair>();

            while (options.Count < 3)
            {
                Random r = new Random();

                int index = r.Next(children.Count);

                if (!path.Contains(children[index]) && !options.Contains(children[index]))
                {
                    options.Add(children[index]);
                }
            }

            return new List<List<DeweyPair>>(){ path, options};
        }


        //uses gets all the required information for a level from the tree
        public TreeGameLevel GetLevel()
        {
            TreeGameLevel level = new TreeGameLevel();

            //the path to the answer
            List<DeweyPair> AnswerPath = TreeHolder.Tree.GetPathToRandom(TreeHolder.Tree.Root, 3);

            //incorrect options for each level
            List<DeweyPair> L1Options = new List<DeweyPair>();
            List<DeweyPair> L2Options = new List<DeweyPair>();
            List<DeweyPair> L3Options = new List<DeweyPair>();


            //gets options for the first level
            while (L1Options.Count < 3)
            {
                DeweyPair r = TreeHolder.Tree.PickRandom(1);

                if (!AnswerPath.Contains(r) && !L1Options.Contains(r))
                {
                    L1Options.Add(r);
                }
            }

            //gets the children of the first level
            L2Options = TreeHolder.Tree.GetChildren(AnswerPath[0]);

            //removes the correct option from the list of children
            if (L2Options.Remove(AnswerPath[1]))
            {
                Console.WriteLine("Removed Answer");
            }
            
            //if there are 3 or more children for a single level
            while (L2Options.Count > 3)
            {
                //pick random from the children
                Random r = new Random();

                int index = r.Next(L2Options.Count);

                L2Options.RemoveAt(index);
            }


            //gets options for second level, if there are not enough children
            while (L2Options.Count < 3)
            {
                DeweyPair r = TreeHolder.Tree.PickRandom(2);

                if (!AnswerPath.Contains(r) && !L2Options.Contains(r))
                {
                    L2Options.Add(r);
                }
            }

            //gets the children of the second level to have similar numbers in the third
            List<DeweyPair> children = TreeHolder.Tree.GetChildren(AnswerPath[1]);

            //gets options for third level
            while (L3Options.Count < 3)
            {
                Random r = new Random();

                int index = r.Next(children.Count);

                if (!AnswerPath.Contains(children[index]) && !L3Options.Contains(children[index]))
                {
                    L3Options.Add(children[index]);
                }
            }

            //models to be used in game
            List<DeweyPairGameModel> l1 = new List<DeweyPairGameModel>();
            List<DeweyPairGameModel> l2 = new List<DeweyPairGameModel>();
            List<DeweyPairGameModel> l3 = new List<DeweyPairGameModel>();
            List<DeweyPairGameModel> ans = new List<DeweyPairGameModel>();

            //converts data models to game models
            ans = GameConverter.DeweyPairListToGameModel(AnswerPath);
            ans.ForEach(x => x.Correct = true);

            l1 = GameConverter.DeweyPairListToGameModel(L1Options);
            l1.ForEach(x => x.Correct = false);
            l2 = GameConverter.DeweyPairListToGameModel(L2Options);
            l2.ForEach(x => x.Correct = false);
            l3 = GameConverter.DeweyPairListToGameModel(L3Options);
            l3.ForEach(x => x.Correct = false);

            //adds correct answers to options lists
            l1.Add(ans[0]);
            l2.Add(ans[1]);
            l3.Add(ans[2]);

            //orders options in numerical order
            l1 = l1.OrderBy(x => x.Number).ToList();
            l2 = l2.OrderBy(x => x.Number).ToList();
            l3 = l3.OrderBy(x => x.Number).ToList();

            //adds to model to be returned
            level.AnswerPath = ans;
            level.Level1Options = l1;
            level.Level2Options = l2;
            level.Level3Options = l3;

            return level;
        }

        //post method for saving user score
        [HttpPost]
        public IActionResult SaveScore(HighScoreModel s)
        {
            FileHelper.AddTreeScore(s);
            return RedirectToAction("HighScores");
        }

        //highscore page
        public IActionResult HighScores()
        {
            return View(FileHelper.GetTreeScores().OrderByDescending(x => x.Score));
        }

    }
}
