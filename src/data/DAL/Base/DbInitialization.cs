using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.Extensions.Configuration;
using Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class DbInitialization
    {
        //public static string GetConnection(string connectionName = null)
        //{
        //    if (string.IsNullOrWhiteSpace(connectionName))
        //    {
        //        connectionName = "DefaultConnection";
        //    }
        //    var config = new ConfigurationBuilder()
        //        .SetBasePath(Directory.GetCurrentDirectory())
        //        .AddJsonFile("appsettings.json")
        //        .Build();

        //    return config.GetConnectionString(connectionName);
        //}

        public static async Task Initialize(RepositoryContext context)
        {
            await context.Database.MigrateAsync();

            if (!await context.Item.AnyAsync())
            {
                var items = new List<ItemModel>
                {
                    new ItemModel { Category = "car", Code = "ccccccc", Name = "123", Price = 10021 },
                };
                items.ForEach(i => context.Item.Add(i));
                await context.SaveChangesAsync();
            }

            if (!await context.User.AnyAsync())
            {
                var users = new List<UserModel>
                {
                    new UserModel{ Login = "admin", Password = "admin", IsManager = true},
                    new UserModel{Login = "test", Password = "test"}
                };
                users.ForEach(u => context.User.Add(u));
                await context.SaveChangesAsync();
            }
        }
    }
}
