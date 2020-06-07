using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.User
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(string connectionString, IRepositoryContextFactory contextFactory)
            : base(connectionString, contextFactory) { }

        public Task<UserModel> ReadUserByCredentials(string userName, string userPassword)
        {
            using (var context = this.CreateContext())
            {
                try
                {
                    return context.User.SingleOrDefaultAsync(u => u.Login == userName.ToLower() && u.Password == userPassword);
                }
                catch
                {
                    return null;
                }
            }
        }

        public async Task<Guid?> Create(UserModel record)
        {
            var createRecord = new UserModel
            {
                Login = record.Login.ToLower(),
                Password = record.Password,
                IsManager = record.IsManager,
                Customer_Id = record.Customer_Id,
            };
            using (var context = CreateContext())
            {
                context.User.Add(createRecord);
                await context.SaveChangesAsync();

                return createRecord.Id;
            }
        }

        public async Task<UserModel> Read(Guid id)
        {
            using (var context = this.CreateContext())
            {
                try
                {
                    return await context.User.SingleOrDefaultAsync(i => i.Id == id);
                }
                catch
                {
                    return null;
                }
            }
        }

        public async Task<PageModel<UserModel>> ReadPage(int rowsPerPage = 5, int page = 0, string order = "asc", string orderBy = "id", string searchString = null)
        {
            using (var context = this.CreateContext())
            {
                var query = context.User.AsQueryable();
                if (!string.IsNullOrWhiteSpace(searchString))
                {
                    query = query.Where(i
                        => i.Login.ToLower().Contains(searchString.ToLower()));
                }
                var count = await query.LongCountAsync();

                var sorted = order == "desc"
                ? query.OrderByDescending(i => GetPropertyByName(i, orderBy))
                : query.OrderBy(i => GetPropertyByName(i, orderBy));

                List<UserModel> rows = rowsPerPage == -1
                    ? await sorted.ToListAsync()
                    : await sorted
                     .Skip(rowsPerPage * page)
                     .Take(rowsPerPage)
                     .ToListAsync();


                return new PageModel<UserModel>(page, rowsPerPage, count, rows);
            }
        }

        public async Task<bool> Update(UserModel record)
        {
            using (var context = this.CreateContext())
            {
                var updateRecord = await this.Read(record.Id);

                if (updateRecord == null)
                {
                    return false;
                }

                updateRecord = record;
                await context.SaveChangesAsync();

                return true;
            }
        }

        public async Task<bool> Delete(Guid id)
        {
            using (var context = this.CreateContext())
            {
                var deleteRecord = await this.Read(id);

                if (deleteRecord == null)
                {
                    return false;
                }
                context.User.Remove(deleteRecord);
                await context.SaveChangesAsync();
                return true;
            }
        }

        private object GetPropertyByName(UserModel record, string property)
        {
            return property switch
            {
                "ismanager" => record.IsManager,
                "login" => record.Login,
                "password" => record.Password,
                _ => record.Id
            };
        }

        public async Task<bool> IsExists(string userName)
        {
            using (var context = this.CreateContext())
            {
                return await context.User.AnyAsync(u => u.Login == userName.ToLower());
            }
        }
    }
}
