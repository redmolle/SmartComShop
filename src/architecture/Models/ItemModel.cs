using Newtonsoft.Json;
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
        [JsonProperty("id")]
        public Guid Id { get; set; }

        /// <summary>
        /// Код товара,
        /// формат «XX-XXXX-YYXX» где Х – число , Y- заглавная буква английского алфавита.
        /// Не пустое.
        /// </summary>
        [Required]
        [JsonProperty("code")]
        public string Code { get; set; }

        /// <summary>
        /// Наименование товара.
        /// </summary>
        [JsonProperty("name")]
        public string Name { get; set; }

        /// <summary>
        /// Цена за единицу.
        /// </summary>
        [JsonProperty("price")]
        public double Price { get; set; }

        /// <summary>
        /// Категория товара.
        /// </summary>
        [JsonProperty("category")]
        public string Category { get; set; }
    }
}