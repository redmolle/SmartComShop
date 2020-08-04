using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL.Customer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Models;
using Utils.Lib;

namespace Customer.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private ICustomerRepository _repository;

        public CustomerController(ICustomerRepository repository)
        {
            this._repository = repository;
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<CustomerModel>> Read(Guid id)
        {
            var record = await this.ReadFromDb(id);
            if (record == null)
            {
                return NotFound(HttpUtils.GenerateError("Заказчик не найден"));
            }
            return Ok(record);
        }

        [HttpGet]
        [Authorize(Roles = UserRole.Manager)]
        public async Task<IActionResult> ReadPage([FromQuery]int rowsPerPage = 10, [FromQuery]int page = 0, [FromQuery]string order = "asc", [FromQuery]string orderBy = "name", [FromQuery]string searchString = null)
        {
            return Ok(await this._repository.ReadPage(rowsPerPage, page, order, orderBy, searchString));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody]CustomerModel record)
        {
            var id = await this._repository.Create(record);
            if (id == null)
            {
                return BadRequest(HttpUtils.GenerateError("Заказчик не создан"));
            }
            return CreatedAtAction(nameof(Read), new { id = id }, null);
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody]CustomerModel record)
        {
            var oldRecord = await this.ReadFromDb(record.Id);
            if (oldRecord == null)
            {
                return NotFound(HttpUtils.GenerateError("Заказчик не найден"));
            }
            var wasUpdated = await this._repository.Update(record);
            if (!wasUpdated)
            {
                return BadRequest(HttpUtils.GenerateError("Заказчик не обновлен"));
            }
            return CreatedAtAction(nameof(Read), new { id = record.Id }, null);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var oldRecord = await this.ReadFromDb(id);
            if (oldRecord == null)
            {
                return NotFound(HttpUtils.GenerateError("Заказчик не найден"));
            }
            var wasDeleted = await this._repository.Delete(id);
            if (!wasDeleted)
            {
                return BadRequest(HttpUtils.GenerateError("Заказчик не удален"));
            }
            return NoContent();
        }

        private async Task<CustomerModel> ReadFromDb(Guid id)
        {
            return await this._repository.Read(id);
        }
    }
}