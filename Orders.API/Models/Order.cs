using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Orders.API.Models
{
    public class Order
    {
        [Key]
       
        public int OrderId {get; set;}
        public int UserId {get; set;}
        public string UserName {get; set;}
        public string DeliveryAddress {get; set;}
        public string Phone {get; set;}
        public DateTime OrderDate {get; set;}
        public bool IsConfirmed {get; set;}
        public string Status {get ;set;}

        public virtual ICollection<OrderItem> OrderItems {get; set;}

    }
}

 