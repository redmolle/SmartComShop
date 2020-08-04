using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Threading.Tasks;
using DAL.User;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace User.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserRepository _repository;

        public UserController(IUserRepository repository)
        {
            this._repository = repository;
        }

        [HttpGet]
        [Route("all")]
        public async Task<IActionResult> ReadPage([FromQuery]int pageSize = 10, [FromQuery]int pageIndex = 0, [FromQuery]string order = "asc", [FromQuery]string orderBy = "name", [FromQuery]string search = null)
        {
            return Ok(await this._repository.ReadPage(pageSize, pageIndex, order, orderBy, search));
        }

        [HttpGet]
        [Route("{id:Guid")]
        public async Task<IActionResult> Read(Guid id)
        {
            var user = await this._repository.Read(id);
            if (user != null)
            {
                return Ok(user);
            }

            return NotFound(GenerateError($"Пользователь не найден."));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody]UserModel user)
        {
            var createdId = await this._repository.Create(user);
            if (createdId == null)
            {
                return BadRequest();
            }

            return CreatedAtAction(nameof(User), new { id = createdId }, null);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> Update(Guid id, [FromBody]UserModel user)
        {
            var oldUser = await this._repository.Read(id);
            if (oldUser == null)
            {
                return NotFound(GenerateError($"Пользователь не найден" ));
            }

            var updatedGuid = await this._repository.Update(user);

            if (updatedGuid == false)
            {
                return BadRequest(GenerateError($"Ошибка при обновлении пользователя"));
            }

            return CreatedAtAction(nameof(User), new { id = user.Id }, null);
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var wasDeleted = await this._repository.Delete(id);
            if (!wasDeleted)
            {
                return NotFound(GenerateError($"Пользователь не найден"));
            }

            return NoContent();
        }

        private object GenerateError(string message) => new { Message = $"Ошибка: {message}!" };
    }
}