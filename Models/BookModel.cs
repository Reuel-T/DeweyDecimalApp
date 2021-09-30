using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DeweyDecimalApp.Models
{
    public class BookModel : IComparable<BookModel>
    {
        public string CallNumber { get; set; }

        public BookModel(string callNumber)
        {
            CallNumber = callNumber;
        }

        public int CompareTo(BookModel other)
        {
            return this.CallNumber.CompareTo(other.CallNumber);
        }
    }
}
