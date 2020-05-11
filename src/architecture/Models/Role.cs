using System;
using System.Collections.Generic;
using System.Text;

namespace Models
{
    /// <summary>
    /// Роль пользователя.
    /// </summary>
    public class Role
    {
        /// <summary>
        /// Администратор.
        /// </summary>
        public const string Admin = "Admin";

        /// <summary>
        /// Менеджер.
        /// </summary>
        public const string Manager = "Manager";

        /// <summary>
        /// Заказчик.
        /// </summary>
        public const string Customer = "Customer";

        /// <summary>
        /// Набор ролей для проверки.
        /// </summary>
        public static IEnumerable<string> Set => new List<string> { Admin, Manager, Customer };
    }
}
