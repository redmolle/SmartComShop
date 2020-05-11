using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Models
{
    /// <summary>
    /// Заказчик.
    /// </summary>
    public class CustomerModel
    {
        /// <summary>
        /// Первичный ключ определяющий запись в таблице.
        /// Не пустое.
        /// </summary>
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        /// <summary>
        /// Наименование заказчика.
        /// Не пустое.
        /// </summary>
        [Required]
        public string Name { get; set; }

        /// <summary>
        /// Код заказчика. Содержит данные формата
        /// «ХХХХ-ГГГГ» где Х – число, ГГГГ – год в котором зарегистрирован заказчик.
        /// Не пустое.
        /// </summary>
        [Required]
        [DisplayFormat(DataFormatString = "0:####-####", ApplyFormatInEditMode = true, NullDisplayText = "")]
        public string Code { get; set; }

        /// <summary>
        /// Адрес заказчика.
        /// </summary>
        public string Address { get; set; }

        /// <summary>
        /// % скидки для заказчика. 0 или null – означает что скидка не распространяется.
        /// </summary>
        public int? Discount { get; set; }

        /// <summary>
        /// Заказы.
        /// </summary>
        public virtual ICollection<OrderModel> Orders { get; set; }
    }
}
