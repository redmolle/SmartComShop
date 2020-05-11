﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL.Catalog;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;

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
        [Route("items")]
        public async Task<IActionResult> Items([FromQuery]int pageSize = 10, [FromQuery]int pageIndex = 0)
        {
            return Ok(await this._repository.GetItems(pageSize, pageIndex));
        }

        [HttpGet]
        [Route("items/{id:Guid}")]
        public async Task<IActionResult> ItemById(Guid id)
        {
            var item = await this._repository.GetItem(id);
            if (item != null)
            {
                return Ok(item);
            }

            return BadRequest();
        }

        [HttpGet]
        [Route("items/category/{category}")]
        public async Task<IActionResult> ItemsByCategory(string category, [FromQuery]int pageSize = 10, [FromQuery]int pageIndex = 0)
        {
            return Ok(await this._repository.GetItems(pageSize, pageIndex, category));
        }

        [HttpGet]
        [Route("categories")]
        public async Task<IActionResult> Categories()
        {
            return Ok(await this._repository.GetCategories());
        }

        [HttpPut]
        [Authorize(Roles = Role.Manager)]
        [Route("items")]
        public async Task<IActionResult> UpdateItem([FromBody]ItemModel item)
        {
            var updatedGuid = await this._repository.UpdateItem(item);
            if (updatedGuid == null)
            {
                return NotFound(new { Message = $"Item with id {item.Id} not found." });
            }
            else
            {
                return CreatedAtAction(nameof(ItemById), new { id = item.Id }, null);
            }
        }

        [HttpPost]
        [Authorize(Roles = Role.Manager)]
        [Route("items")]
        public async Task<IActionResult> CreateItem([FromBody]ItemModel item)
        {
            var createdGuid = await this._repository.CreateItem(item);
            return CreatedAtAction(nameof(ItemById), new { id = createdGuid }, null);
        }

        [HttpDelete]
        [Authorize(Roles = Role.Manager)]
        [Route("items/{id}")]
        public async Task<IActionResult> DeleteItem(Guid id)
        {
            var wasDeleted = await this._repository.DeleteItem(id);
            if (!wasDeleted)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}