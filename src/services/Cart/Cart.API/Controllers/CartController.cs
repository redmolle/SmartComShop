using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Policy;
using System.Threading.Tasks;
using System.Web;
using DAL.Catalog;
using DAL.Customer;
using DAL.Order;
using DAL.OrderItem;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;
using Newtonsoft.Json;
using Utils.Lib;

namespace Cart.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private IOrderRepository _orderRepository;
        private IOrderItemRepository _orderItemRepository;
        private ICustomerRepository _customerRepository;
        private ICatalogRepository _catalogRepository;

        public CartController(IOrderRepository orderRepository, IOrderItemRepository orderItemRepository, ICustomerRepository customerRepository, ICatalogRepository catalogRepository)
        {
            this._orderRepository = orderRepository;
            this._orderItemRepository = orderItemRepository;
            this._customerRepository = customerRepository;
            this._catalogRepository = catalogRepository;
        }

        [HttpGet]
        [Route("create")]
        public async Task<IActionResult> Create([FromQuery]Guid customerId)
        {
            object error = HttpUtils.GenerateError("Корзина не создана");
            if (customerId == null)
            {
                var name = DateTime.Now.ToString();
                var createdCustomerId = await this._customerRepository.Create(new CustomerModel
                {
                    Name = name,
                    Code = name,
                });
                if (createdCustomerId == null)
                {
                    return BadRequest(error);
                }
                customerId = createdCustomerId.Value;
            }
            var cart = await this.GetCart(customerId);
            if (cart == null)
            {
                var count = await this._orderRepository.Count(customerId);
                var createdId = await this._orderRepository.Create(new OrderModel
                {
                    Customer_Id = customerId,
                    Order_Date = DateTime.Now,
                    Order_Number = count + 1,
                    Status = OrderStatus.CART,
                });
                if (createdId == null)
                {
                    return BadRequest(error);
                }
            }

            return Ok(customerId);
        }

        [HttpGet]
        [Route("{customerId}/add")]
        public async Task<IActionResult> Add(Guid customerId, [FromQuery]Guid itemId)
        {
            var (cart, item, orderItem) = await this.GetCart(customerId, itemId);
            if (cart == null)
            {
                return NotFound(HttpUtils.GenerateError("Корзина не найдена"));
            }

            if (item == null)
            {
                return NotFound(HttpUtils.GenerateError("Товар не найден"));
            }

            if (orderItem == null)
            {
                var orderItemId = await this._orderItemRepository.Create(new OrderItemModel
                {
                    Order_Id = cart.Id,
                    Item_Id = item.Id,
                    Item_Price = item.Price,
                    Items_Count = 1,
                });
                if (orderItemId == null)
                {
                    return BadRequest(HttpUtils.GenerateError("Не удалось добавить товар в корзину"));
                }
            }
            else
            {
                orderItem.Items_Count += 1;
                var wasUpdated = await this._orderItemRepository.Update(orderItem);
                if (!wasUpdated)
                {
                    return BadRequest(HttpUtils.GenerateError("Не удалось добавить товар в корзину"));
                }
            }
            return NoContent();
        }

        [HttpGet]
        [Route("{customerId}/delete")]
        public async Task<IActionResult> Delete(Guid customerId, [FromQuery]Guid itemId)
        {
            var (cart, item, orderItem) = await this.GetCart(customerId, itemId);
            if (cart == null)
            {
                return NotFound(HttpUtils.GenerateError("Корзина не найдена"));
            }

            if (item == null)
            {
                return NotFound(HttpUtils.GenerateError("Товар не найден"));
            }

            if (orderItem == null)
            {
                return NotFound(HttpUtils.GenerateError("Товар отсутствует в корзине"));
            }
            else
            {
                var wasDeleted = false;
                if (orderItem.Items_Count > 1)
                {
                    orderItem.Items_Count -= 1;
                    wasDeleted = await this._orderItemRepository.Update(orderItem);
                }
                else
                {
                    wasDeleted = await this._orderItemRepository.Delete(orderItem.Id);
                }

                if (!wasDeleted)
                {
                    return BadRequest(HttpUtils.GenerateError("Не удалось удалить товар из корзины"));
                }
            }
            return NoContent();
        }

        [HttpGet]
        [Route("{customerId}/cancel")]
        public async Task<IActionResult> Cancel(Guid customerId)
        {
            var cart= await this.GetCart(customerId);
            if (cart == null)
            {
                return NotFound(HttpUtils.GenerateError("Корзина не найдена"));
            }

            cart.Status = OrderStatus.CANCELLED;
            var wasUpdated = await this._orderRepository.Update(cart);
            if (!wasUpdated)
            {
                return BadRequest(HttpUtils.GenerateError("Заказ не отменен"));
            }

            return NoContent();
        }

        [HttpGet]
        [Route("{customerId}/confirm")]
        public async Task<IActionResult> Confirm(Guid customerId)
        {
            var cart = await this.GetCart(customerId);
            if (cart == null)
            {
                return NotFound(HttpUtils.GenerateError("Корзина не найдена"));
            }

            cart.Status = OrderStatus.CREATED;
            cart.Order_Date = DateTime.Now;
            var wasUpdated = await this._orderRepository.Update(cart);
            if (!wasUpdated)
            {
                return BadRequest(HttpUtils.GenerateError("Заказ не подтвержден"));
            }

            return NoContent();
        }

        [HttpGet]
        [Route("{customerId}")]
        public async Task<IActionResult> Read(Guid customerId, [FromQuery]int rowsPerPage = 10, [FromQuery]int page = 0, [FromQuery]string order = "asc", [FromQuery]string orderBy = "name", [FromQuery]string searchString = null)
        {
            var cart = await this.GetCart(customerId);
            if (cart == null)
            {
                return NotFound(HttpUtils.GenerateError("Корзина не найдена"));
            }
            return Ok(await this._orderItemRepository.ReadPage(rowsPerPage, page, order, orderBy, searchString));

        }

        private async Task<OrderModel> GetCart(Guid customerId)
        {
            return await this._orderRepository.ReadCart(customerId);
        }

        private async Task<(OrderModel, ItemModel, OrderItemModel)> GetCart(Guid customerId, Guid? itemId)
        {
            var cart = await this.GetCart(customerId);
            ItemModel item = null;
            OrderItemModel orderItem = null;

            cart = await this._orderRepository.ReadCart(customerId);
            if (itemId != null)
            {
                item = await this._catalogRepository.Read(itemId.Value);
                if (cart != null && item != null)
                {
                    var orderItems = await this._orderItemRepository.ReadPage(cart.Id, -1);
                    orderItem = orderItems.Data.FirstOrDefault(i => i.Item_Id == itemId);
                }
            }
            return (cart, item, orderItem);
        }
    }
}