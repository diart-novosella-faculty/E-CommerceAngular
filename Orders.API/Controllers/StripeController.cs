using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Okta.Sdk;
using Stripe;


namespace Orders.API.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class StripeController : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult<Registration>> CreateAsync([FromBody] Registration registration)
        {
            ChargeCard(registration);
       
            return Ok(registration);
        }

        private Stripe.Charge ChargeCard(Registration registration)
        {
            StripeConfiguration.SetApiKey("sk_test_hnUkKoraPeqft7w7Ya40egta00YJbUmdz9");

            var customerService = new CustomerService();

            var customer = customerService.Create(new CustomerCreateOptions{
                Email = registration.Email,
                Source = registration.Token
            });

            var options = new ChargeCreateOptions
            {
                Amount = registration.Amount,
                Currency = "USD",
                Description = "test",
                CustomerId = customer.Id
            };

            var service = new ChargeService();
            return service.Create(options);
        }
    }

    public class Registration
    {
        public string Token {get ;set;}
        public string Email {get; set;}
        public long Amount {get ;set;}

    }
}