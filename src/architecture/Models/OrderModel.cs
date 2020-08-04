using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Models
{
    /// <summary>
    /// Заказ.
    /// </summary>
    public class OrderModel
    {
        /// <summary>
        /// Первичный ключ определяющий запись в таблице.
        /// Не пустое.
        /// </summary>
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        /// <summary>
        /// ИД заказчика.
        /// Не пустое.
        /// </summary>
        [Required]
        public Guid Customer_Id { get; set; }

        /// <summary>
        /// Заказчик.
        /// </summary>
        [ForeignKey("Customer_Id")]
        public virtual CustomerModel Customer { get; set; }

        /// <summary>
        /// Дата когда сделан заказ.
        /// Не пустое.
        /// </summary>
        [Required]
        public DateTime Order_Date { get; set; }

        /// <summary>
        /// Дата доставки.
        /// </summary>
        public DateTime Shipment_Date { get; set; }

        /// <summary>
        /// Номер заказа.
        /// </summary>
        public int Order_Number { get; set; }

        /// <summary>
        /// Состояние заказа.
        /// </summary>
        public string Status { get; set; }

        /// <summary>
        /// Элементы заказа.
        /// </summary>
        public virtual ICollection<OrderItemModel> OrderItems { get; set; }
    }
}