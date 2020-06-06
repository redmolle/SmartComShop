using Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Cart
{
    public interface ICartRepository
    {
        Task AddToCart(Guid customerId, Guid itemId, int count=1);
        Task<OrderModel> GetCart(Guid customerId, bool isNeedCreate=false);
        Task<bool> DeleteFromCart(Guid customerId, Guid itemId);
        Task<bool> DeleteCart(Guid customerId);

    }
}
