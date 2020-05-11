using System;
using System.Collections.Generic;
using System.Text;

namespace Models
{
    /// <summary>
    /// Модель пейджинга.
    /// </summary>
    /// <typeparam name="TEntity">Элемент на странице.</typeparam>
    public class Page<TEntity> where TEntity : class
    {
        /// <summary>
        /// Номер страницы.
        /// </summary>
        public int PageIndex { get; private set; }

        /// <summary>
        /// Размер страницы.
        /// </summary>
        public int PageSize { get; private set; }

        /// <summary>
        /// Общее количество элементов.
        /// </summary>
        public long Count { get; set; }

        /// <summary>
        /// Данные на странице.
        /// </summary>
        public IEnumerable<TEntity> Data { get; set; }

        /// <summary>
        /// Создание страницы.
        /// </summary>
        /// <param name="pageIndex">Номер страницы.</param>
        /// <param name="pageSize">Размер страницы.</param>
        /// <param name="count">Общее количество элементов.</param>
        /// <param name="data">Данные на странице.</param>
        public Page(int pageIndex, int pageSize, long count, IEnumerable<TEntity> data)
        {
            this.PageIndex = pageIndex;
            this.PageSize = pageSize;
            this.Count = count;
            this.Data = data;
        }
    }
}
