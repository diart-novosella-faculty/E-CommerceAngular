using System.Collections.Generic;
using System.Threading.Tasks;
using Orders.API.Models;

namespace Orders.API.Data
{
    public interface IOrdersRepository
    {
        void Add<T>(T entity) where T : class;
       
        Task<bool> SaveAll();
        //Return users
        Task<IEnumerable<Order>> GetOrders();
        //getting individualUser from dbs
        Task<Order> GetOrder(int id);
        
    }
}