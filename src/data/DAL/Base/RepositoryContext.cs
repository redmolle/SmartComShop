using Microsoft.EntityFrameworkCore;
using Models;
using System;

namespace DAL
{
    public class RepositoryContext : DbContext
    {
        public RepositoryContext(DbContextOptions<RepositoryContext> options)
            : base(options)
        {
        }

        public DbSet<CustomerModel> Customer { get; set; }

        public DbSet<OrderModel> Order { get; set; }

        public DbSet<ItemModel> Item { get; set; }

        public DbSet<OrderItem> OrderItem { get; set; }

        public DbSet<UserModel> User { get; set; }
    }
}
