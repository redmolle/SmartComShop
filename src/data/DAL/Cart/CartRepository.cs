using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Cart
{
    public class CartRepository : BaseRepository, ICartRepository
    {
        const string CartStatus = "cart";
        public CartRepository(string connectionString, IRepositoryContextFactory contextFactory)
            : base(connectionString, contextFactory) { }

        public async Task AddToCart(Guid customerId, Guid itemId, int count = 1)
        {
            using (var context = this.CreateContext())
            {
                var cart = await GetCart(customerId, true);
                var item = await context.Item.FirstOrDefaultAsync(i => i.Id == itemId);
                var orderItems = await context.OrderItem.FirstOrDefaultAsync(i => i.Order_Id == cart.Id && i.Item_Id == itemId);
                if (orderItems == null)
                {
                    context.OrderItem.Add(new OrderItem
                    {
                        Order_Id = cart.Id,
                        Item_Id = itemId,
                        Items_Count = count,
                        Item_Price = item.Price,
                    });
                }
                else
                {
                    orderItems.Items_Count = count;
                    orderItems.Item_Price = item.Price;
                }
                await context.SaveChangesAsync();
            }
        }

        public async Task<bool> DeleteCart(Guid customerId)
        {
            using (var context = this.CreateContext())
            {
                var cart = await GetCart(customerId);
                if (cart == null)
                {
                    return false;
                }
                cart.Status = "Cancelled";
                await context.SaveChangesAsync();
                return true;
            }
        }

        public async Task<bool> DeleteFromCart(Guid customerId, Guid itemId)
        {
            using (var context = this.CreateContext())
            {
                var cart = await GetCart(customerId, true);
                var orderItems = await context.OrderItem.FirstOrDefaultAsync(i => i.Order_Id == cart.Id && i.Item_Id == itemId);
                if (orderItems == null)
                {
                    return false;
                }
                context.OrderItem.Remove(orderItems);
                await context.SaveChangesAsync();
                return true;
            }
        }

        public async Task<OrderModel> GetCart(Guid customerId, bool isNeedCreate = false)
        {
            using (var context = this.CreateContext())
            {
                var cart = await context.Order.FirstOrDefaultAsync(o => o.Customer_Id == customerId && o.Status == CartStatus);
                if (isNeedCreate && cart == null)
                {
                    context.Order.Add(new OrderModel
                    {
                        Customer_Id = customerId,
                        Order_Date = DateTime.Now,
                        Order_Number = 1,
                        Status = CartStatus,
                    });
                    await context.SaveChangesAsync();
                    return await GetCart(customerId);
                }

                return cart;
            }
        }
    }
}
