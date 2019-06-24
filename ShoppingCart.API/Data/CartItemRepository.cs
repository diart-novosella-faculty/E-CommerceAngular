using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ShoppingCart.Models;

namespace ShoppingCart.API.Data
{
    public class CartItemRepository : ICartItemRepository
    {
        private readonly DataContext context;
        public CartItemRepository(DataContext context){
            this.context = context;
        }
        public void Add(CartItem cart)
        {
             context.Add(cart);
        }

        public int Count()
        {
            return context.CartItems.Count();
        }

        public async void Delete(int id)
        {
            var cartItem = await  GetCartItem(id);
            if (cartItem != null)
            {
                 context.CartItems.Remove(cartItem);
            }
        }

        public async Task<CartItem> GetCartItem(int id)
        {
            return  await context.CartItems.FirstOrDefaultAsync(c => c.CartId == id);
        }

        public Task<IEnumerable<CartItem>> GetCartItems(int userId)
        {
            throw new System.NotImplementedException();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await context.SaveChangesAsync() > 0;
        }

        public void Update(CartItem cart)
        {
            context.CartItems.Update(cart);
        }
    }
}