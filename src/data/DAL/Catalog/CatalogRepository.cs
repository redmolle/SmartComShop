using DAL.Base;
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


        public async Task<Guid?> Create(ItemModel record)
        {
            var createRecord = new ItemModel
            {
                Category = record.Category,
                Code = record.Code,
                Name = record.Name,
                Price = record.Price,
            };

            using (var context = CreateContext())
            {
                context.Item.Add(createRecord);
                await context.SaveChangesAsync();

                return createRecord.Id;
            }
        }

        public async Task<ItemModel> Read(Guid id)
        {
            using (var context = this.CreateContext())
            {
                try
                {
                    return await context.Item.SingleOrDefaultAsync(i => i.Id == id);
                }
                catch
                {
                    return null;
                }
            }
        }

        public async Task<PageModel<ItemModel>> ReadPage(int rowsPerPage = 5, int page = 0, string order = "asc", string orderBy = "name", string searchString = null)
        {
            using (var context = this.CreateContext())
            {
                var query = context.Item.AsQueryable();
                if (!string.IsNullOrWhiteSpace(searchString))
                {
                    query = query.Where(i
                        => i.Category.ToLower().Contains(searchString.ToLower())
                        || i.Name.ToLower().Contains(searchString.ToLower()));
                }
                var count = await query.LongCountAsync();

                var sorted = order == "desc"
                ? query.OrderByDescending(i => GetPropertyByName(i, orderBy))
                : query.OrderBy(i => GetPropertyByName(i, orderBy));

                List<ItemModel> rows = rowsPerPage == -1
                    ? await sorted.ToListAsync()
                    : await sorted
                     .Skip(rowsPerPage * page)
                     .Take(rowsPerPage)
                     .ToListAsync();


                return new PageModel<ItemModel>(page, rowsPerPage, count, rows);
            }
        }

        public async Task<bool> Update(ItemModel record)
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
                context.Item.Remove(deleteRecord);
                await context.SaveChangesAsync();
                return true;
            }
        }


        private object GetPropertyByName(ItemModel record, string property)
        {
            return property switch
            {
                "code" => record.Code,
                "category" => record.Category,
                "price" => record.Price,
                _ => record.Name
            };
        }
    }
}
