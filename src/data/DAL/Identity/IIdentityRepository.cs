using Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Identity
{
    public interface IIdentityRepository
    {
        Task<UserModel> GetUser(string userName);

        Task<UserModel> CheckUserCredentials(string userName, string userPassword);

        Task<Guid?> CreateUser(UserModel user);
    }
}
