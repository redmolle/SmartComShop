using System;
using System.Collections.Generic;
using System.Text;

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
