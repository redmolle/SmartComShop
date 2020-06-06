using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Models
{
    /// <summary>
    /// Пользователь системы.
    /// </summary>
    public class UserModel
    {
        /// <summary>
        /// ID пользователя.
        /// </summary>
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonProperty("id")]
        public Guid Id { get; set; }

        /// <summary>
        /// Имя пользователя.
        /// </summary>
        [Required]
        [JsonProperty("login")]
        public string Login { get; set; }

        /// <summary>
        /// Пароль пользователя.
        /// </summary>
        [Required]
        [JsonProperty("password")]
        public string Password { get; set; }

        /// <summary>
        /// Строка ролей пользователя.
        /// </summary>
        [JsonProperty("roleset")]
        public string RoleSet { get; set; }

        /// <summary>
        /// Набор ролей пользователей.
        /// </summary>
        [NotMapped]
        public IEnumerable<string> Roles => RoleSet?.Split(',');
    }
}
