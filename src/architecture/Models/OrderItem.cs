using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Models
{
    /// <summary>
    /// Элемент заказа.
    /// </summary>
    public class OrderItem
    {
        /// <summary>
        /// Первичный ключ определяющий запись в таблице.
        /// Не пустое.
        /// </summary>
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        /// <summary>
        /// ИД заказа.
        /// Не пустое.
        /// </summary>
        [Required]
        public Guid Order_Id { get; set; }

        /// <summary>
        /// Заказ.
        /// </summary>
        [ForeignKey("Order_Id")]
        public virtual OrderModel Order { get; set; }

        /// <summary>
        /// ИД товара.
        /// Не пустое.
        /// </summary>
        [Required]
        public Guid Item_Id { get; set; }

        /// <summary>
        /// Товар.
        /// </summary>
        [ForeignKey("Item_Id")]
        public virtual ItemModel Item { get; set; }

        /// <summary>
        /// Количество заказанного товара.
        /// Не пустое.
        /// </summary>
        [Required]
        public int Items_Count { get; set; }

        /// <summary>
        /// Цена  за единицу.
        /// Не пустое.
        /// </summary>
        [Required]
        public double Item_Price { get; set; }
    }
}
