using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using DAL.Customer;
using DAL.Order;
using DAL.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Models;
using Newtonsoft.Json;
using Utils.Lib;

namespace Order.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private IOrderRepository _orderRepository;
        private IUserRepository _userRepository;
        private ICustomerRepository _customerRepository;

        public OrderController(IOrderRepository repository, IUserRepository userRepository, ICustomerRepository customerRepository)
        {
            this._orderRepository = repository;
            this._userRepository = userRepository;
            this._customerRepository = customerRepository;
        }

        [HttpGet]
        [Route("status")]
        public async Task<IActionResult> Status()
        {
            return Ok(this.GetStatus());
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] OrderModel order)
        {
            var oldOrder = await this._orderRepository.Read(order.Id);
            if (oldOrder == null)
            {
                return NotFound(HttpUtils.GenerateError("Заказ не найден"));
            }
            var wasUpdated = await this._orderRepository.Update(order);
            if (!wasUpdated)
            {
                return BadRequest(HttpUtils.GenerateError("Заказ не изменен"));
            }

            return NoContent();
        }

        private List<string> GetStatus()
        {
            return new List<string>
            {
                OrderStatus.CART,
                OrderStatus.CREATED,
                OrderStatus.DELIVERING,
                OrderStatus.COMPLETE,
                OrderStatus.CANCELLED,
            };
        }
    }
}