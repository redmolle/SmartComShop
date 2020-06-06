using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL.Cart;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Cart.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private ICartRepository _repository;

        public CartController(ICartRepository repository)
        {
            this._repository = repository;
        }

        [HttpGet]

        [Route("customer/{customerId}")]
        public async Task<IActionResult> Cart(Guid customerId)
        {
            return Ok(await this._repository.GetCart(customerId, true));
        }

        [HttpPut]
        [Route("customer/{customerId:Guid}")]
        public async Task<IActionResult> AddToCart(Guid customerId, [FromQuery]Guid itemId, [FromQuery]int count = 1)
        {
            await this._repository.AddToCart(customerId, itemId, count);
            return Ok();
        }

        [HttpPut]
        [Route("customer/{customerId:Guid}")]
        public async Task<IActionResult> DeleteFromCart(Guid customerId, [FromQuery]Guid itemId)
        {
            var wasDeleted = await this._repository.DeleteFromCart(customerId, itemId);
            if (!wasDeleted)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpDelete]
        [Route("customer/{customerId:Guid}")]
        public async Task<IActionResult> DeleteCart(Guid customerId)
        {
            var wasDeleted = await this._repository.DeleteCart(customerId);
            if (!wasDeleted)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}