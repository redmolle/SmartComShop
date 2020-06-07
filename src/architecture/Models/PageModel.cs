using System;
using System.Collections.Generic;
using System.Text;

namespace Models
{
    /// <summary>
    /// Модель пейджинга.
    /// </summary>
    /// <typeparam name="TEntity">Элемент на странице.</typeparam>
    public class PageModel<TEntity> where TEntity : class
    {
        /// <summary>
        /// Номер страницы.
        /// </summary>
        public int Page { get; private set; }

        /// <summary>
        /// Размер страницы.
        /// </summary>
        public int RowsPerPage { get; private set; }

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
        /// <param name="page">Номер страницы.</param>
        /// <param name="rowsPerPage">Размер страницы.</param>
        /// <param name="totalCount">Общее количество элементов.</param>
        /// <param name="data">Данные на странице.</param>
        public PageModel(int page, int rowsPerPage, long totalCount, IEnumerable<TEntity> data)
        {
            this.Page = page;
            this.RowsPerPage = rowsPerPage;
            this.Count = totalCount;
            this.Data = data;
        }
    }
}
