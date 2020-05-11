using Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Catalog
{
    public interface ICatalogRepository
    {
        Task<ItemModel> GetItem(Guid catalogId);

        Task<long> Count();

        Task<Page<ItemModel>> GetItems(int pageSize, int pageIndex, string category = null);

        Task<IEnumerable<string>> GetCategories();

        Task<Guid?> UpdateItem(ItemModel item);

        Task<Guid?> CreateItem(ItemModel item);

        Task<bool> DeleteItem(Guid id);
    }
}
