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
        /// Менеджер?.
        /// </summary>
        public bool IsManager { get; set; }

        /// <summary>
        /// Id клиента.
        /// </summary>
        public Guid? Customer_Id { get; set; }

        /// <summary>
        /// Клиент.
        /// </summary>
        [ForeignKey("Cusomer_Id")]
        public virtual CustomerModel Customer { get; set; }
    }
}
