using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShoppingCart.Models
{
    [Table("CartItem")]
    public class CartItem
    {
        [Key]
        public int CartId { get; set; }

        public int? Quantity { get; set; }

        public decimal? UnitPrice { get; set; }

        public decimal? Price { get; set; }
    
        public int? ProductId { get; set; }

        public int UserId { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime AddedDate { get; set; }
    }
}