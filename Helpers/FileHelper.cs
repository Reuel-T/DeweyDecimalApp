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

        public static void AddScore(HighScoreModel newScore) 
        {
            List<HighScoreModel> highScores = GetScores();

            highScores.Add(newScore);

            string scoreList = JsonSerializer.Serialize(highScores);

            File.WriteAllText(HighScoreFile, scoreList);
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

        public static void CreateFile() 
        {
            List<HighScoreModel> highScores = new List<HighScoreModel>();

            Random rnd = new Random();

            highScores.Add(new HighScoreModel { Name = "Rootler", Score = 100000 }) ;
            highScores.Add(new HighScoreModel { Name = "Player1", Score = rnd.Next(1,10001) }) ;
            highScores.Add(new HighScoreModel { Name = "Player2", Score = rnd.Next(1, 10001) }) ;
            highScores.Add(new HighScoreModel { Name = "Player3", Score = rnd.Next(1, 10001) }) ;
            highScores.Add(new HighScoreModel { Name = "Player4", Score = rnd.Next(1, 10001) }) ;
            highScores.Add(new HighScoreModel { Name = "Player5", Score = rnd.Next(1, 10001) }) ;
            highScores.Add(new HighScoreModel { Name = "Player6", Score = rnd.Next(1, 10001) }) ;

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

        public static Dictionary<string, string> GetKeyValuePairs() 
        {
            return JsonSerializer.Deserialize<Dictionary<string, string>>(File.ReadAllText(CallNumFile));
        }

    }
}
