using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Orders.API.Models;

namespace Orders.API.Data
{
    public class OrdersRepository : IOrdersRepository
    {
        private readonly DataContext context;
        
        public OrdersRepository(DataContext context){
            this.context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            context.Add(entity);
        }

        public async Task<Order> GetOrder(int id)
        {
            var order = await context.Orders.Include(p=>p.OrderItems).FirstOrDefaultAsync(p=>p.OrderId == id);

            return order;
        }
 
          public async Task<IEnumerable<Order>> GetOrders()
        {



            var orders = await context.Orders.Include(p=>p.OrderItems).ToListAsync();
        

               
          return orders;
        }

         public async Task<bool> SaveAll()
        {
            return await context.SaveChangesAsync() > 0 ;
        }

    }
}