using Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Base
{
    public interface ICrudRepository<T>
        where T : class
    {
        Task<Guid?> Create(T record);
        Task<T> Read(Guid id);
        Task<PageModel<T>> ReadPage(int rowsPerPage=5, int page=0, string order = "asc", string orderBy = "id", string searchString = null);
        Task<bool> Update(T record);
        Task<bool> Delete(Guid id);
    }
}
