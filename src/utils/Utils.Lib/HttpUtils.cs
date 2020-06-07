using Microsoft.Extensions.Configuration;
using System;
using System.Linq;
using System.Net;

namespace Utils.Lib
{
    public class HttpUtils
    {
        public static object GenerateError(string message) => new { Message = $"Ошибка: {message}!" };

    }
}
