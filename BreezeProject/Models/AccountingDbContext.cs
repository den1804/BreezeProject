using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using BreezeProject.Migrations;


namespace BreezeProject.Models
{
    public class AccountingDbContext : DbContext
    {
        static AccountingDbContext()
        {
            Database.SetInitializer<AccountingDbContext>(new MigrateDatabaseToLatestVersion<AccountingDbContext, Configuration>());
        }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Department> Departments { get; set; }
    }
}