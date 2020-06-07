using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL.Catalog;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using Utils.Lib;

namespace Catalog.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CatalogController : Controller
    {
        private ICatalogRepository _repository;

        public CatalogController(ICatalogRepository repository)
        {
            this._repository = repository;
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> Read(Guid id)
        {
            var fromDb = await this.ReadFromDb(id);
            if (fromDb == null)
            {
                return NotFound(HttpUtils.GenerateError("Товар не найден"));
            }
            return Ok(fromDb);
        }
        [HttpGet]
        public async Task<IActionResult> ReadPage([FromQuery]int rowsPerPage = 10, [FromQuery]int page = 0, [FromQuery]string order = "asc", [FromQuery]string orderBy="name", [FromQuery]string searchString=null)
        {
            return Ok(await this._repository.ReadPage(rowsPerPage, page, order, orderBy, searchString));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody]ItemModel record)
        {
            var id = await this._repository.Create(record);
            if (id == null)
            {
                return BadRequest(HttpUtils.GenerateError("Товар не создан"));
            }
            return CreatedAtAction(nameof(Read), new { id = id }, null);
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody]ItemModel record)
        {
            var oldRecord = await this.ReadFromDb(record.Id);
            if (oldRecord == null)
            {
                return NotFound(HttpUtils.GenerateError("Товар не найден"));
            }
            var wasUpdated = await this._repository.Update(record);
            if (!wasUpdated)
            {
                return BadRequest(HttpUtils.GenerateError("Товар не обновлен"));
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
                return NotFound(HttpUtils.GenerateError("Товар не найден"));
            }
            var wasDeleted = await this._repository.Delete(id);
            if (!wasDeleted)
            {
                return BadRequest(HttpUtils.GenerateError("Товар не удален"));
            }
            return NoContent();
        }

        [HttpGet]
        [Route("categories")]
        public async Task<IActionResult> Categories()
        {
            return Ok(new List<string>
            {
                CatalogCategories.Car,
                CatalogCategories.Moto,
                CatalogCategories.Water
            });
        }

        private async Task<ItemModel> ReadFromDb(Guid id)
        {
            return await this._repository.Read(id);
        }
    }
}