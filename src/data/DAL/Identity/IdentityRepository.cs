using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Identity
{
    public class IdentityRepository : BaseRepository, IIdentityRepository
    {
        public IdentityRepository(string connectionString, IRepositoryContextFactory contextFactory)
            : base(connectionString, contextFactory) { }

        public async Task<UserModel> CheckUserCredentials(string userName, string userPassword)
        {
            using (var context = this.CreateContext())
            {
                return await context.User.SingleOrDefaultAsync(u => u.Login.ToLower().Equals(userName.ToLower()) && u.Password.Equals(userPassword));
            }
        }

        public async Task<Guid?> CreateUser(UserModel user)
        {
            using (var context = this.CreateContext())
            {
                var exists = await context.User.AnyAsync(u => u.Login.ToLower().Equals(user.Login.ToLower()));
                if (exists)
                {
                    return null;
                }

                var createUser = new UserModel
                {
                    Login = user.Login,
                    Password = user.Password,
                };

                context.User.Add(createUser);
                await context.SaveChangesAsync();

                return createUser.Id;
            }
        }

        public async Task<UserModel> GetUser(string userName)
        {
            using (var db = this.CreateContext())
            {
                return await db.User
                    .FirstOrDefaultAsync(u => u.Login.ToLower().Equals(userName.ToLower()));
            }
        }
    }
}
