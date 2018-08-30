using Breeze.ContextProvider;
using Breeze.ContextProvider.EF6;
using Breeze.WebApi2;
using BreezeProject.Models;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BreezeProject.Controllers
{
    [BreezeController]
    public class DbController : ApiController
    {
        private EFContextProvider<AccountingDbContext> _contextProvider = new EFContextProvider<AccountingDbContext>();

        [HttpGet]
        public String Metadata()
        {
            return _contextProvider.Metadata();
        }

        [HttpGet]
        public IQueryable<Employee> Employees()
        {
            return _contextProvider.Context.Employees;
        }

        [HttpGet]
        public IQueryable<Department> Departments()
        {
            return _contextProvider.Context.Departments;
        }

        [HttpPost]
        public SaveResult SaveChanges(JObject saveBundle)
        {
            return _contextProvider.SaveChanges(saveBundle);
        }
    }
}
