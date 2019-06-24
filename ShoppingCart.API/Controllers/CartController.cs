using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ShoppingCart.API.Data;
using System.Linq;
using ShoppingCart.Models;
using System;
using ShoppingCart.API.Dto;
using Microsoft.EntityFrameworkCore;
namespace ShoppingCart.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ICartItemRepository repo;
        private readonly DataContext context;

        public CartController(ICartItemRepository repo, DataContext context)
        {
            this.repo = repo;
            this.context = context;
        }
        [HttpGet("{userId}")]
        public async Task<IActionResult> Cart(int userId)
        {

            var query = from p in context.CartItems
                        where p.UserId == userId
                        group p by new { p.ProductId, p.UserId } into g
                        select new
                        {
                            ProductId = g.Key.ProductId,
                            Count = g.Count()
                        };
                        
            return Ok(query);
        }
        [HttpPost("{id}")]
        public async Task<IActionResult> AddToCart([FromBody]ProductIdModel productId, int id)
        {
            
            if (productId != null)
            {
                CartItem cartItem = new CartItem()
                {
                    UserId = id,
                    AddedDate = DateTime.Now,
                    ProductId = Convert.ToInt32(productId.id)
                
                };
                    context.Add(cartItem);
                
                     /*
                       var query = from m in context.CartItems
                          where m.ProductId != 0 // or what ever the foreign key name is...
                          select m;

                         var count = query.Count();
                      */
                  
                if (await repo.SaveAllAsync())
                {
                    
                    return Ok();
                }

            }
            else
            {
                return NotFound();
            }
            throw new Exception($"Failed to Add to Cart");

        }

    }
}