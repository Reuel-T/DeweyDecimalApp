﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DeweyDecimalApp.DataStructs
{
    public class TreeNode<T>
    {
        public T Data { get; set; }
        public List<TreeNode<T>> Children { get; set; }

        public TreeNode() { }

        public TreeNode(T data) 
        {
            Data = data;
            Children = new List<TreeNode<T>>();
        }

        public void AddChild(T Data) 
        {
            this.Children.Add(new TreeNode<T>(Data));
        }
    }
}
