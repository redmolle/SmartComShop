using Microsoft.EntityFrameworkCore.Design;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL
{
    public interface IRepositoryContextFactory : IDesignTimeDbContextFactory<RepositoryContext>
    {
        RepositoryContext CreateDbContext(string connectionString);
    }
}
