using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Auth.Lib;
using DAL.Customer;
using DAL.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Models;
using Utils.Lib;

namespace Auth.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private IUserRepository _userRepository;
        private ICustomerRepository _customerRepository;

        public AuthController(IUserRepository userRepository, ICustomerRepository customerRepository)
        {
            this._userRepository = userRepository;
            this._customerRepository = customerRepository;
        }

        [HttpPost]
        [Route("singin")]
        public async Task<IActionResult> SignIn([FromBody]UserModel user)
        {
            var token = await this.GetToken(user.Login, user.Password);
            if (token == null)
            {
                return BadRequest(HttpUtils.GenerateError("Неверное имя пользователя или пароль"));
            }
            return Ok(token);
        }

        [HttpPost]
        [Route("signup")]
        public async Task<IActionResult> SignUp([FromBody]UserModel user)
        {
            object error = HttpUtils.GenerateError("Пользователь не создан");

            if (string.IsNullOrWhiteSpace(user.Login + user.Password))
            {
                return BadRequest(error);
            }

            var isExists = await this._userRepository.IsExists(user.Login);
            if (isExists)
            {
                return BadRequest(HttpUtils.GenerateError("Такое имя пользователя уже занято"));
            }

            var customerId = await this._customerRepository.Create(new CustomerModel
            {
                Name = user.Login,
                Code = user.Login,
                Discount = 0,
            });
            if (customerId == null)
            {
                return BadRequest(error);
            }

            var userId = await this._userRepository.Create(new UserModel
            {
                Login = user.Login,
                Password = user.Password,
                IsManager = user.IsManager,
                Customer_Id = customerId,
            });
            if (userId == null)
            {
                return BadRequest(error);
            }

            return await this.SignIn(user);
        }


        [HttpGet]
        public async Task<IActionResult> ReadPage([FromQuery]int rowsPerPage = 10, [FromQuery]int page = 0, [FromQuery]string order = "asc", [FromQuery]string orderBy = "name", [FromQuery]string searchString = null)
        {
            return Ok(await this._userRepository.ReadPage(rowsPerPage, page, order, orderBy, searchString));
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> Read(Guid id)
        {
            var fromDb = await this._userRepository.Read(id);
            if (fromDb == null)
            {
                return NotFound(HttpUtils.GenerateError("Пользователь не найден"));
            }
            return Ok(fromDb);
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody]UserModel record)
        {
            var oldRecord = await this._userRepository.Read(record.Id);
            if (oldRecord == null)
            {
                return NotFound(HttpUtils.GenerateError("Пользователь не найден"));
            }
            var wasUpdated = await this._userRepository.Update(record);
            if (!wasUpdated)
            {
                return BadRequest(HttpUtils.GenerateError("Пользователь не обновлен"));
            }
            return CreatedAtAction(nameof(Read), new { id = record.Id }, null);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var oldRecord = await this._userRepository.Read(id);
            if (oldRecord == null)
            {
                return NotFound(HttpUtils.GenerateError("Пользователь не найден"));
            }
            var wasDeleted = await this._userRepository.Delete(id);
            if (!wasDeleted)
            {
                return BadRequest(HttpUtils.GenerateError("Пользователь не удален"));
            }
            return NoContent();
        }

        private async Task<object> GetToken(string userName, string userPassword)
        {
            var user = await this._userRepository.ReadUserByCredentials(userName, userPassword);
            if (user == null)
            {
                return null;
            }

            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, user.Id.ToString()),
                new Claim(ClaimsIdentity.DefaultRoleClaimType, user.IsManager ? UserRole.Manager : UserRole.Customer),
            };

            var identity = new ClaimsIdentity(
                claims,
                "Token",
                ClaimsIdentity.DefaultNameClaimType,
                ClaimsIdentity.DefaultRoleClaimType
            );

            var token = JwtAuth.GenerateToken(identity.Claims);

            return Ok(new { access_token = token, userId = user.Id, customerId = user.Customer_Id });
        }
    }
}