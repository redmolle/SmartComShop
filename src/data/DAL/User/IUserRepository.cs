using DAL.Base;
using Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DAL.User
{
    public interface IUserRepository : ICrudRepository<UserModel>
    {
        Task<UserModel> ReadUserByCredentials(string userName, string userPassword);
        Task<bool> IsExists(string userName);
    }
}
