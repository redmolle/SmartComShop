using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL
{
    public class RepositoryContextFactory : IRepositoryContextFactory
    {
        public RepositoryContext CreateDbContext(string connectionString)
        {
            var optionsBuilder = new DbContextOptionsBuilder<RepositoryContext>();
            optionsBuilder.UseNpgsql(connectionString);

            return new RepositoryContext(optionsBuilder.Options);
        }

        public RepositoryContext CreateDbContext(string[] args)
        {
            //To DO
            return this.CreateDbContext("Host=localhost;Port=5432;Database=SmartComShopDb;Username=postgres;Password=password");
        }
    }
}
