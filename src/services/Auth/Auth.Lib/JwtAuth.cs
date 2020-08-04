using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Auth.Lib
{
    /// <summary>
    /// Конфигурация аутентификации.
    /// </summary>
    public class JwtAuth
    {
        /// <summary>
        /// издатель токена.
        /// </summary>
        private const string ISSUER = "MyAuthServer";

        /// <summary>
        /// потребитель токена.
        /// </summary>
        private const string AUDIENCE = "MyAuthClient";

        /// <summary>
        /// ключ для шифрации.
        /// </summary>
        private const string KEY = "mysupersecret_secretkey!123";

        /// <summary>
        /// время жизни токена - 1 минута.
        /// </summary>
        private const int LIFETIME = 15;

        /// <summary>
        /// Генератор ключа.
        /// </summary>
        /// <returns>Ключ.</returns>
        private static SymmetricSecurityKey GetSymmetricSecurityKey() => new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));

        /// <summary>
        /// Генератор токена.
        /// </summary>
        /// <param name="claims">Набор требований.</param>
        /// <returns>Токен Jwt.</returns>
        public static string GenerateToken(IEnumerable<Claim> claims, int? minutes = null)
        {
            var now = DateTime.UtcNow;

            var jwt = new JwtSecurityToken(
                issuer: ISSUER,
                audience: AUDIENCE,
                notBefore: now,
                claims: claims,
                expires: now.AddMinutes(minutes ?? LIFETIME),
                signingCredentials: new SigningCredentials(GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            return encodedJwt;
        }

        /// <summary>
        /// Установка сервиса аутентификации (DI).
        /// </summary>
        /// <param name="services">Набор сервиса.</param>
        public static void SetAuthService(IServiceCollection services)
        {
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                    .AddJwtBearer(options =>
                    {
                        options.RequireHttpsMetadata = false;
                        options.TokenValidationParameters = new TokenValidationParameters
                        {
                            ValidateIssuer = true,
                            ValidIssuer = ISSUER,

                            ValidateAudience = true,
                            ValidAudience = AUDIENCE,

                            ValidateLifetime = true,

                            IssuerSigningKey = GetSymmetricSecurityKey(),
                            ValidateIssuerSigningKey = true,
                        };
                    });
        }
    }
}