using DAL.Order;
using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.OrderItem
{
    public class OrderItemRepository : BaseRepository, IOrderItemRepository
    {
        public OrderItemRepository(string connectionString, IRepositoryContextFactory contextFactory)
            : base(connectionString, contextFactory) { }

        public async Task<Guid?> Create(OrderItemModel record)
        {
            var createRecord = new OrderItemModel
            {
                Item_Id = record.Item_Id,
                Items_Count = record.Items_Count,
                Item_Price = record.Item_Price,
                Order_Id = record.Order_Id,
            };

            using (var context = CreateContext())
            {
                context.OrderItem.Add(createRecord);
                await context.SaveChangesAsync();

                return createRecord.Id;
            }
        }

        public async Task<OrderItemModel> Read(Guid id)
        {
            using (var context = this.CreateContext())
            {
                try
                {
                    return await context.OrderItem.SingleOrDefaultAsync(i => i.Id == id);
                }
                catch
                {
                    return null;
                }
            }
        }

        public async Task<PageModel<OrderItemModel>> ReadPage(int rowsPerPage = 5, int page = 0, string order = "asc", string orderBy = "id", string searchString = null)
        {
            using (var context = this.CreateContext())
            {
                var query = context.OrderItem.AsQueryable();
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

                List<OrderItemModel> rows = rowsPerPage == -1
                    ? await sorted.ToListAsync()
                    : await sorted
                     .Skip(rowsPerPage * page)
                     .Take(rowsPerPage)
                     .ToListAsync();


                return new PageModel<OrderItemModel>(page, rowsPerPage, count, rows);
            }
        }

        public async Task<bool> Update(OrderItemModel record)
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
                context.OrderItem.Remove(deleteRecord);
                await context.SaveChangesAsync();
                return true;
            }
        }

        private object GetPropertyByName(OrderItemModel record, string property)
        {
            return property switch
            {
                "item_price" => record.Item_Price,
                "items_count" => record.Items_Count,
                _ => record.Id,
            };
        }
        public async Task<PageModel<OrderItemModel>> ReadPage(Guid? orderId, int rowsPerPage = 5, int page = 0, string order = "asc", string orderBy = "id", string searchString = null)
        {
            using (var context = this.CreateContext())
            {
                var query = context.OrderItem.AsQueryable();
                if (orderId != null)
                {
                    query = query.Where(i => i.Order_Id == orderId);
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

                List<OrderItemModel> rows = rowsPerPage == -1
                    ? await sorted.ToListAsync()
                    : await sorted
                     .Skip(rowsPerPage * page)
                     .Take(rowsPerPage)
                     .ToListAsync();


                return new PageModel<OrderItemModel>(page, rowsPerPage, count, rows);
            }

        }
    }
}
