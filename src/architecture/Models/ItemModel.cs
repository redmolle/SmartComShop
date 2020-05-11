using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    /// <summary>
    /// Товар.
    /// </summary>
    public class ItemModel
    {
        /// <summary>
        /// Первичный ключ определяющий запись в таблице.
        /// Не пустое.
        /// </summary>
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        /// <summary>
        /// Код товара,
        /// формат «XX-XXXX-YYXX» где Х – число , Y- заглавная буква английского алфавита.
        /// Не пустое.
        /// </summary>
        [Required]
        [DisplayFormat(DataFormatString = "0:##-####-####", ApplyFormatInEditMode = true, NullDisplayText = "")]
        public string Code { get; set; }

        /// <summary>
        /// Наименование товара.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Цена за единицу.
        /// </summary>
        public double Price { get; set; }

        /// <summary>
        /// Категория товара.
        /// </summary>
        public string Category { get; set; }
    }
}