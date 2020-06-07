using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Customer
{
    public class CustomerRepository : BaseRepository, ICustomerRepository
    {
        public CustomerRepository(string connectionString, IRepositoryContextFactory contextFactory)
            : base(connectionString, contextFactory) { }

        public async Task<Guid?> Create(CustomerModel record)
        {
            var createCustomer = new CustomerModel
            {
                Name = record.Name,
                Code = record.Code,
                Address = record.Address,
                Discount = record.Discount,
            };

            using (var context = CreateContext())
            {
                context.Customer.Add(createCustomer);
                await context.SaveChangesAsync();

                return createCustomer.Id;
            }
        }

        public async Task<CustomerModel> Read(Guid id)
        {
            using (var context = this.CreateContext())
            {
                try
                {
                    return await context.Customer.SingleOrDefaultAsync(i => i.Id == id);
                }
                catch
                {
                    return null;
                }
            }
        }

        public async Task<PageModel<CustomerModel>> ReadPage(int rowsPerPage = 5, int page = 0, string order = "asc", string orderBy = "id", string searchString = null)
        {
            using (var context = this.CreateContext())
            {
                var query = context.Customer.AsQueryable();
                if (!string.IsNullOrWhiteSpace(searchString))
                {
                    query = query.Where(i
                        => i.Name.ToLower().Contains(searchString.ToLower())
                        || i.Code.ToLower().Contains(searchString.ToLower())
                        || i.Discount.ToString().ToLower().Contains(searchString.ToLower())
                        || i.Address.ToLower().Contains(searchString.ToLower()));
                }
                var count = await query.LongCountAsync();

                var sorted = order == "desc"
                ? query.OrderByDescending(i => GetPropertyByName(i, orderBy))
                : query.OrderBy(i => GetPropertyByName(i, orderBy));

                List<CustomerModel> rows = rowsPerPage == -1
                    ? await sorted.ToListAsync()
                    : await sorted
                     .Skip(rowsPerPage * page)
                     .Take(rowsPerPage)
                     .ToListAsync();


                return new PageModel<CustomerModel>(page, rowsPerPage, count, rows);
            }
        }

        public async Task<bool> Update(CustomerModel record)
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
                context.Customer.Remove(deleteRecord);
                await context.SaveChangesAsync();
                return true;
            }
        }

        private object GetPropertyByName(CustomerModel record, string property)
        {
            return property switch
            {
                "code" => record.Code,
                "discount" => record.Discount,
                "address" => record.Address,
                _ => record.Id
            };
        }
    }
}
