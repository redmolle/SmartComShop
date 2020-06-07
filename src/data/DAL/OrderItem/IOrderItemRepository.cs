using DAL.Base;
using Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DAL.OrderItem
{
    public interface IOrderItemRepository : ICrudRepository<OrderItemModel>
    {
        Task<PageModel<OrderItemModel>> ReadPage(Guid? orderId, int rowsPerPage = 5, int page = 0, string order = "asc", string orderBy = "id", string searchString = null);

    }
}
