using System;
using System.Collections.Generic;
using System.Text;

namespace Models
{
    /// <summary>
    /// Роль пользователя.
    /// </summary>
    public class UserRole
    {
        /// <summary>
        /// Менеджер.
        /// </summary>
        public const string Manager = "Manager";

        /// <summary>
        /// Заказчик.
        /// </summary>
        public const string Customer = "Customer";

        public const string All = "Manager,Customer";
    }
}
