using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BreezeProject.Models
{
    public class Employee
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
        public decimal Salary { get; set; }
        public bool IsWork { get; set; }
        public DateTime DateToStartWork { get; set; }
        public int DepartmentId { get; set; }
        public Department Department { get; set; }
    }
}