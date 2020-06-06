using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Auth.Lib;
using DAL.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Models;

namespace Auth.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private IUserRepository _repository;

        public AuthController(IUserRepository repository)
        {
            this._repository = repository;
        }

        [HttpPost]
        [Route("token")]
        public async Task<IActionResult> Token([FromBody]UserModel user)
        {
            var identity = await this.GetIdentity(user.Login, user.Password);
            if (identity == null)
            {
                return BadRequest(new { errorText = "Неверное имя пользователя или пароль!" });
            }

            var token = JwtAuth.GenerateToken(identity.Claims);

            return Ok(new { access_token = token, username = user.Login });
        }

        [HttpGet]
        [Route("Login")]
        [Authorize]
        public IActionResult CheckLogin()
        {
            return Ok(User.Identity.Name);
        }

        private async Task<ClaimsIdentity> GetIdentity(string userName, string userPassword)
        {
            var user = await this._repository.CheckUserCredentials(userName, userPassword);
            if (user == null)
            {
                return null;
            }

            var claims = new List<Claim> { new Claim(ClaimsIdentity.DefaultNameClaimType, user.Login), };

            user.Roles?
                .Where(r => Role.Set.Contains(r))
                .ToList()
                .ForEach(r => claims.Add(new Claim(ClaimsIdentity.DefaultRoleClaimType, r)));

            var claimsIdentity = new ClaimsIdentity(
                claims,
                "Token",
                ClaimsIdentity.DefaultNameClaimType,
                ClaimsIdentity.DefaultRoleClaimType
            );

            return claimsIdentity;
        }
    }
}