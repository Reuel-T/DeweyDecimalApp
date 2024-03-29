﻿using DeweyDecimalApp.DataStructs;
using DeweyDecimalApp.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace DeweyDecimalApp.Helpers
{
    public class FileHelper
    {
        public static string HighScoreFile = "HighScores.json";
        
        public static string CallNumFile = "CallNums.json";
        public static string MatchingScoreFile = "MatchingScores.json";
        
        public static string TreeGameDataFile = "Tree.json";
        public static string TreeHighScoreFile = "TreeScores.json";

        #region BOOK SWAPPING
        public static bool ScoreFileExists()
        {
            if (File.Exists(HighScoreFile))
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public static void AddScore(HighScoreModel newScore)
        {
            List<HighScoreModel> highScores = GetScores();

            highScores.Add(newScore);

            string scoreList = JsonSerializer.Serialize(highScores);

            File.WriteAllText(HighScoreFile, scoreList);
        }

        public static void CreateFile()
        {
            List<HighScoreModel> highScores = new List<HighScoreModel>();

            Random rnd = new Random();

            highScores.Add(new HighScoreModel { Name = "Rootler", Score = 100000 });
            highScores.Add(new HighScoreModel { Name = "Player1", Score = rnd.Next(1, 10001) });
            highScores.Add(new HighScoreModel { Name = "Player2", Score = rnd.Next(1, 10001) });
            highScores.Add(new HighScoreModel { Name = "Player3", Score = rnd.Next(1, 10001) });
            highScores.Add(new HighScoreModel { Name = "Player4", Score = rnd.Next(1, 10001) });
            highScores.Add(new HighScoreModel { Name = "Player5", Score = rnd.Next(1, 10001) });
            highScores.Add(new HighScoreModel { Name = "Player6", Score = rnd.Next(1, 10001) });

            string highScoreContent = JsonSerializer.Serialize(highScores);


            using (StreamWriter sw = File.CreateText(HighScoreFile))
            {
                sw.WriteLine(highScoreContent);
            }
        }

        public static List<HighScoreModel> GetScores()
        {
            return JsonSerializer.Deserialize<List<HighScoreModel>>(File.ReadAllText(HighScoreFile));
        }

        #endregion


        #region MATCHING GAME
        public static bool CallNumFileExists()
        {
            if (File.Exists(CallNumFile))
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public static bool MScoreFileExists()
        {
            if (File.Exists(MatchingScoreFile))
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public static void AddMatchingScore(HighScoreModel newScore)
        {
            List<HighScoreModel> highScores = GetMatchingScores();

            highScores.Add(newScore);

            string scoreList = JsonSerializer.Serialize(highScores);

            File.WriteAllText(MatchingScoreFile, scoreList);
        }

        public static void CreateCallNumFile()
        {
            Dictionary<string, string> callNums = new Dictionary<string, string>();

            callNums.Add("000", "General Knowledge");
            callNums.Add("100", "Philosophy & Psychology");
            callNums.Add("200", "Religion");
            callNums.Add("300", "Social Sciences");
            callNums.Add("400", "Language");
            callNums.Add("500", "Natural Sciences & Mathematics");
            callNums.Add("600", "Technology (Applied Sciences)");
            callNums.Add("700", "The Arts");
            callNums.Add("800", "Literature & Rhetoric");
            callNums.Add("900", "Geography & History");

            //https://www.library.illinois.edu/infosci/research/guides/dewey/

            string CallNumContent = JsonSerializer.Serialize(callNums);

            using (StreamWriter sw = File.CreateText(CallNumFile))
            {
                sw.WriteLine(CallNumContent);
            }

        }

        public static void CreateMatchingScoreFile()
        {
            List<HighScoreModel> highScores = new List<HighScoreModel>();

            Random rnd = new Random();

            highScores.Add(new HighScoreModel { Name = "Rootler", Score = 100000 });
            highScores.Add(new HighScoreModel { Name = "Player1", Score = rnd.Next(1, 10001) });
            highScores.Add(new HighScoreModel { Name = "Player2", Score = rnd.Next(1, 10001) });
            highScores.Add(new HighScoreModel { Name = "Player3", Score = rnd.Next(1, 10001) });
            highScores.Add(new HighScoreModel { Name = "Player4", Score = rnd.Next(1, 10001) });
            highScores.Add(new HighScoreModel { Name = "Player5", Score = rnd.Next(1, 10001) });
            highScores.Add(new HighScoreModel { Name = "Player6", Score = rnd.Next(1, 10001) });

            string highScoreContent = JsonSerializer.Serialize(highScores);


            using (StreamWriter sw = File.CreateText(MatchingScoreFile))
            {
                sw.WriteLine(highScoreContent);
            }
        }


        public static List<HighScoreModel> GetMatchingScores()
        {
            return JsonSerializer.Deserialize<List<HighScoreModel>>(File.ReadAllText(MatchingScoreFile));
        }

        public static Dictionary<string, string> GetKeyValuePairs()
        {
            return JsonSerializer.Deserialize<Dictionary<string, string>>(File.ReadAllText(CallNumFile));
        }

        #endregion

        #region TREEGAME

        //checks if the data file exists
        public static bool TreeGameDataExists() 
        {
            if (File.Exists(TreeGameDataFile))
            {
                return true;
            }
            else 
            {
                return false;
            }
        }

        //checks if the score file exists
        public static bool TreeGameScoresExists() 
        {
            if (File.Exists(TreeHighScoreFile))
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        //creates a score file
        public static void CreateTreeScoreFile() 
        {
            List<HighScoreModel> highScores = new List<HighScoreModel>();

            Random rnd = new Random();

            highScores.Add(new HighScoreModel { Name = "Rootler", Score = 100000 });
            highScores.Add(new HighScoreModel { Name = "Player1", Score = rnd.Next(1, 10001) });
            highScores.Add(new HighScoreModel { Name = "Player2", Score = rnd.Next(1, 10001) });
            highScores.Add(new HighScoreModel { Name = "Player3", Score = rnd.Next(1, 10001) });
            highScores.Add(new HighScoreModel { Name = "Player4", Score = rnd.Next(1, 10001) });
            highScores.Add(new HighScoreModel { Name = "Player5", Score = rnd.Next(1, 10001) });
            highScores.Add(new HighScoreModel { Name = "Player6", Score = rnd.Next(1, 10001) });

            string highScoreContent = JsonSerializer.Serialize(highScores);


            using (StreamWriter sw = File.CreateText(TreeHighScoreFile))
            {
                sw.WriteLine(highScoreContent);
            }
        }

        //creates the tree data
        public static void CreateTreeDataFile() 
        {
            //gets a tree from the generator file
            Tree<DeweyPair> tree = TreeGenerator.PlantTree();

            //well, this file cant be a one liner, for the sake of my sanity
            JsonSerializerOptions options = new JsonSerializerOptions { WriteIndented = true };

            //make json string
            string treeJSON = JsonSerializer.Serialize(tree, options);
            
            //writes tree to file
            using (StreamWriter sw = File.CreateText(TreeGameDataFile))
            {
                sw.WriteLine(treeJSON);
            }
        }

        public static Tree<DeweyPair> GetTree() 
        {
            return JsonSerializer.Deserialize<Tree<DeweyPair>>(File.ReadAllText(TreeGameDataFile));
        }

        //adds a new highscore to the score file
        public static void AddTreeScore(HighScoreModel newScore) 
        {
            List<HighScoreModel> highScores = GetTreeScores();

            highScores.Add(newScore);

            string scoreList = JsonSerializer.Serialize(highScores);

            File.WriteAllText(TreeHighScoreFile, scoreList);
        }

        //gets the list of highscores
        public static List<HighScoreModel> GetTreeScores()
        {
            return JsonSerializer.Deserialize<List<HighScoreModel>>(File.ReadAllText(TreeHighScoreFile));
        }

        #endregion
    }
}
