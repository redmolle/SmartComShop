using DAL.Base;
using Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Customer
{
    public interface ICustomerRepository : ICrudRepository<CustomerModel>
    {
    }
}
