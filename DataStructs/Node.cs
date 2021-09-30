using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DeweyDecimalApp.DataStructs
{
    public class Node<T>
    {
        public Node<T> Next { get; set; }
        public Node<T> Previous { get; set; }
        public T Data { get; set; }

        public Node(T n)
        {
            Next = null;
            Previous = null;
            Data = n;
        }

        public Node()
        {

        }
    }
}
