using DAL.OrderItem;
using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Order
{
    public class OrderRepository : BaseRepository, IOrderRepository
    {
        public OrderRepository(string connectionString, IRepositoryContextFactory contextFactory)
            : base(connectionString, contextFactory) { }

        public async Task<Guid?> Create(OrderModel record)
        {
            int count = await this.Count(record.Customer_Id);
            var createRecord = new OrderModel
            {
                Customer_Id = record.Customer_Id,
                Order_Number = record.Order_Number,
                Order_Date = record.Order_Date,
                Status = record.Status,
                Shipment_Date = record.Shipment_Date,
            };

            using (var context = CreateContext())
            {
                context.Order.Add(createRecord);
                await context.SaveChangesAsync();
                return createRecord.Id;
            }
        }

        public async Task<int> Count(Guid customerId)
        {
            using (var context = CreateContext())
            {
                return await context.Order.Where(o => o.Customer_Id == customerId).CountAsync();
            }
        }

        public async Task<OrderModel> Read(Guid id)
        {
            using (var context = this.CreateContext())
            {
                try
                {
                    return await context.Order.SingleOrDefaultAsync(i => i.Id == id);
                }
                catch
                {
                    return null;
                }
            }
        }

        public async Task<PageModel<OrderModel>> ReadPage(int rowsPerPage = 5, int page = 0, string order = "asc", string orderBy = "id", string searchString = null)
        {
            return await ReadPage(null, rowsPerPage, page, order, orderBy, searchString);
        }

        public async Task<PageModel<OrderModel>> ReadPage(Guid? customerId, int rowsPerPage = 5, int page = 0, string order = "asc", string orderBy = "id", string searchString = null)
        {
            using (var context = this.CreateContext())
            {
                var query = context.Order.AsQueryable();

                if (customerId != null)
                {
                    query = query.Where(q => q.Customer_Id == customerId);
                }
                //if (!string.IsNullOrWhiteSpace(searchString))
                //{
                //    query = query.Where(i
                //        => i.Category.ToLower().Contains(searchString.ToLower())
                //        || i.Name.ToLower().Contains(searchString.ToLower()));
                //}
                var count = await query.LongCountAsync();

                var sorted = order == "desc"
                ? query.OrderByDescending(i => GetPropertyByName(i, orderBy))
                : query.OrderBy(i => GetPropertyByName(i, orderBy));

                List<OrderModel> rows = rowsPerPage == -1
                    ? await sorted.ToListAsync()
                    : await sorted
                     .Skip(rowsPerPage * page)
                     .Take(rowsPerPage)
                     .ToListAsync();


                return new PageModel<OrderModel>(page, rowsPerPage, count, rows);
            }
        }

        public async Task<bool> Update(OrderModel record)
        {
            using (var context = this.CreateContext())
            {
                var updateRecord = await context.Order.SingleOrDefaultAsync(i => i.Id == record.Id);

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
                context.Order.Remove(deleteRecord);
                await context.SaveChangesAsync();
                return true;
            }
        }

        private object GetPropertyByName(OrderModel record, string property)
        {
            return property switch
            {
                "order_date" => record.Order_Date,
                "order_number" => record.Order_Number,
                "shipment_date" => record.Shipment_Date,
                _ => record.Status
            };
        }

        public async Task<OrderModel> ReadCart(Guid customerId)
        {
            using (var context = this.CreateContext())
            {
                try
                {
                    return await context.Order.SingleOrDefaultAsync(c => c.Customer_Id == customerId && c.Status == OrderStatus.CART);
                }
                catch
                {
                    return null;
                }
            }
        }

    }
}
