using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public abstract class BaseRepository
    {
        private string ConnectionString { get; set; }

        private IRepositoryContextFactory ContextFactory { get; set; }

        public BaseRepository(string connectionString, IRepositoryContextFactory contextFactory)
        {
            this.ConnectionString = connectionString;
            this.ContextFactory = contextFactory;
            using (var context = this.CreateContext())
            {
                DbInitialization.Initialize(context).Wait();
            }
        }

        protected RepositoryContext CreateContext()
        {
            return this.ContextFactory.CreateDbContext(this.ConnectionString);
        }
    }
}
