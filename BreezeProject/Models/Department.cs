﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BreezeProject.Models
{
    public class Department
    {
        public int Id { get; set; }
        public String Name { get; set; }
        public List<Employee> Employees { get; set; }
    }
   
}
