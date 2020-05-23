using Microsoft.EntityFrameworkCore;
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

        public async Task<ItemModel> CreateItem(ItemModel item)
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

                return createItem;
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

        public async Task<Page<ItemModel>> GetItems(int pageSize, int pageIndex, string category = null)
        {
            using (var context = this.CreateContext())
            {
                var query = context.Item.AsQueryable();
                if (!string.IsNullOrWhiteSpace(category))
                {
                    query = query.Where(i => i.Category.ToLower().StartsWith(category.ToLower()));
                }

                var count = await query.LongCountAsync();

                var itemsOnPage = await query
                    .OrderBy(i => i.Name)
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
    }
}
