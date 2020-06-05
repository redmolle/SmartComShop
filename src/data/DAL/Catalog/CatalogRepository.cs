using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Catalog
{
    public class CatalogRepository : BaseRepository, ICatalogRepository
    {
        public CatalogRepository(string connectionString, IRepositoryContextFactory contextFactory)
            : base(connectionString, contextFactory) { }

        public async Task<long> Count()
        {
            using (var context = this.CreateContext())
            {
                return await context.Item.LongCountAsync();
            }
        }

        public async Task<Guid?> CreateItem(ItemModel item)
        {
            var createItem = new ItemModel
            {
                Category = item.Category,
                Code = item.Code,
                Name = item.Name,
                Price = item.Price,
            };

            using (var context = CreateContext())
            {
                context.Item.Add(createItem);
                await context.SaveChangesAsync();

                return createItem.Id;
            }
        }

        public async Task<bool> DeleteItem(Guid id)
        {
            using (var context = this.CreateContext())
            {
                var item = await context.Item.SingleOrDefaultAsync(i => i.Id == id);

                if (item == null)
                {
                    return false;
                }
                context.Item.Remove(item);
                await context.SaveChangesAsync();
                return true;
            }
        }

        public async Task<IEnumerable<string>> GetCategories()
        {
            using (var context = this.CreateContext())
            {
                return await context.Item
                    .Select(i => i.Category)
                    .Distinct()
                    .ToListAsync();
            }
        }

        public async Task<ItemModel> GetItem(Guid catalogId)
        {
            using (var context = this.CreateContext())
            {
                return await context.Item
                    .FirstOrDefaultAsync(i => i.Id == catalogId);
            }
        }

        public async Task<Page<ItemModel>> GetItems(int pageSize, int pageIndex, string order = "asc", string orderBy = "name", string search = null)
        {
            using (var context = this.CreateContext())
            {
                var query = context.Item.AsQueryable();
                if (!string.IsNullOrWhiteSpace(search))
                {
                    query = query.Where(i
                        => i.Category.ToLower().Contains(search.ToLower())
                        || i.Name.ToLower().Contains(search.ToLower()));
                }
                var count = await query.LongCountAsync();

                //this.Sort(query, order, orderBy);
                var sorted = this.Sort(query, order, orderBy);

                List<ItemModel> itemsOnPage = pageSize == -1
                    ? await sorted.ToListAsync()
                    : await sorted
                     .Skip(pageSize * pageIndex)
                     .Take(pageSize)
                     .ToListAsync();


                return new Page<ItemModel>(pageIndex, pageSize, count, itemsOnPage);
            }
        }

        public async Task<Guid?> UpdateItem(ItemModel updatedItem)
        {
            using (var context = this.CreateContext())
            {
                var catalogItem = await context.Item.SingleOrDefaultAsync(i => i.Id == updatedItem.Id);

                if(catalogItem == null)
                {
                    return null;
                }

                catalogItem = updatedItem;
                await context.SaveChangesAsync();

                return updatedItem.Id;
            }
        }

        private IOrderedQueryable<ItemModel> Sort(IQueryable<ItemModel> query, string order, string orderBy)
        {
            return orderBy.ToLower() switch
            {
                "code" => order == "desc"
                ? query.OrderByDescending(i => i.Code)
                : query.OrderBy(i => i.Code),

                "category" => order == "desc"
                ? query.OrderByDescending(i => i.Category)
                : query.OrderBy(i => i.Category),

                "price" => order == "desc"
                ? query.OrderByDescending(i => i.Price)
                : query.OrderBy(i => i.Price),

                _ => order == "desc"
                ? query.OrderByDescending(i => i.Name)
                : query.OrderBy(i => i.Name),
            };
        }
    }
}
