using System.Collections.Generic;
using System.Threading.Tasks;
using ShoppingCart.Models;

namespace ShoppingCart.API.Data
{
    public interface ICartItemRepository
    {
        Task<IEnumerable<CartItem>> GetCartItems(int userId);

        Task<CartItem> GetCartItem(int id);

        void Add(CartItem cart);

        void Update(CartItem cart);

        void Delete(int id);

        int Count();

        Task<bool> SaveAllAsync();
    }
}