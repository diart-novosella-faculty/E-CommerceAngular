using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Orders.API.Data;
using Orders.API.Models;
using System;

namespace Orders.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrdersRepository repo;
        private readonly DataContext context;

        public OrdersController(IOrdersRepository repo,DataContext context)
        {
            this.context = context;
            this.repo = repo;
        }
        [HttpGet]
        public async Task<IActionResult> GetOrders(){
            var orders = await repo.GetOrders();

            if(orders == null){
                return NotFound();
            }

            return Ok(orders);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrder(int id){
            var order = await repo.GetOrder(id);



            if(order == null){
                return NotFound();
            }

            return Ok(order);
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrder(Order orderDetails){
            if(!ModelState.IsValid){
                return BadRequest(ModelState);
            }
            orderDetails.IsConfirmed = false;
            orderDetails.OrderDate = DateTime.Now;
            orderDetails.Status = "Placed";

            context.Orders.Add(orderDetails);

            if(await repo.SaveAll()){
                return Ok(orderDetails.OrderId);
            }

            throw new Exception($"Order was not placed");

        }
    }
}