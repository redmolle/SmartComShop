using DAL.Base;
using Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Order
{
    public interface IOrderRepository : ICrudRepository<OrderModel>
    {
        Task<PageModel<OrderModel>> ReadPage(Guid? customerId, int rowsPerPage = 5, int page = 0, string order = "asc", string orderBy = "id", string searchString = null);
        Task<OrderModel> ReadCart(Guid customerId);
        Task<int> Count(Guid customerId);
    }
}
