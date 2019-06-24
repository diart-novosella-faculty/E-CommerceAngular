using System.ComponentModel.DataAnnotations.Schema;

namespace Orders.API.Models
{
    public class OrderItem
    {
        public int Id {get; set;}
        public int ProductId {get; set;}
        public string ProductName {get; set;}
        public int OrderedQuantity {get; set;}
        public decimal UnitPrice {get; set;}
        [ForeignKey("OrderId")]
       
        public int OrderId {get; set;}
        public virtual Order Order {get;set;}
    }
}