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

    }
}
