using Microsoft.EntityFrameworkCore;
using ShoppingCart.Models;

namespace ShoppingCart.API.Data
{
    public class DataContext:DbContext
    {
          public DataContext(DbContextOptions<DataContext> options):base(options){}

        public DbSet<CartItem> CartItems {get;set;}
        
    }
}