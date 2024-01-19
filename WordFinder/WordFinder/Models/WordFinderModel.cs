using Microsoft.AspNetCore.Mvc;
using Microsoft.JSInterop;
using System.Web;
using System.Collections.Generic;

namespace WordFinder.Models
{
    public class WordFinderModel
    {
        private IEnumerable<string> matrix = new List<string>();
        private IEnumerable<string> rotatedMatrix = new List<string>();
        private IList<string> words = new List<string>();
        public WordFinderModel(IEnumerable<string> matrixItems)
        {
            this.matrix = matrixItems;  
        }

        public void RotateMatrix() {
            IList<string> rotatedItems = new List<string>();
            for (int charNum = 0; charNum < matrix.Count(); charNum++)
            {
                string lineRotated = string.Empty;
                for (int line = 0; line < matrix.Count(); line++)
                {
                    lineRotated += matrix.ElementAt(line)[charNum];
                }
                rotatedItems.Add(lineRotated);
            }
            rotatedMatrix =  new List<string>(rotatedItems);
        }

        public IEnumerable<string> Find(IEnumerable<string> wordstream)
        {
            IList<string> result = new List<string>();

            try
            {
                foreach (string word in wordstream)
                {
                    foreach (string horizLine in matrix)
                    {
                        if (horizLine.Contains(word))
                        {
                            result.Add(word);
                        }
                    }
                    foreach (string vertLine in rotatedMatrix)
                    {
                        if (vertLine.Contains(word))
                        {
                            result.Add(word);
                        }
                    }
                }

                var groupedItems = result.GroupBy(item => item)
                                          .Select(group => new { Item = group.Key, Count = group.Count() })
                                          .OrderByDescending(item => item.Count)
                                          .Take(10);



                result = new List<string>();

                foreach (var sortedItem in groupedItems)
                {
                    result.Add(sortedItem.Item);
                }

                if (result.Count < 10)
                {
                    for (int i = result.Count; i < 10; i++)
                    {
                        result.Add(string.Empty);
                    }
                }
            }
            catch (Exception)
            {
                for (int i = result.Count; i < 10; i++)
                {
                    result.Add("There is and issue. Please contact system administrator.");
                };
            }
            
            return result;
        }
    }
}
