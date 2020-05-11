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
        public Guid Id { get; set; }

        /// <summary>
        /// Имя пользователя.
        /// </summary>
        [Required]
        public string Login { get; set; }

        /// <summary>
        /// Пароль пользователя.
        /// </summary>
        [Required]
        public string Password { get; set; }

        /// <summary>
        /// Строка ролей пользователя.
        /// </summary>
        public string RoleSet { get; set; }

        /// <summary>
        /// Набор ролей пользователей.
        /// </summary>
        [NotMapped]
        public IEnumerable<string> Roles => RoleSet?.Split(',');
    }
}
