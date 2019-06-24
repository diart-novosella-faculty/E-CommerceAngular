import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { User } from "src/models/User";
import { Product } from "src/models/product";
import { ShoppingCartService } from "src/services/cart.service";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { OrderItem } from "src/models/OrderItem";
import { Order } from "src/models/Order";
import { OrderService } from "src/services/order.service";
import { AlertifyService } from "src/services/alertify.service";
import { ChangeDetectorRef, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-checkout-form",
  templateUrl: "./checkout-form.component.html",
  styleUrls: ["./checkout-form.component.scss"]
})
export class CheckoutFormComponent implements OnInit {
  
 
  user: User;
  productsInCart: Product[];
  totalPrice: number;
  orderItem: OrderItem[];
  order: Order;




  model:any = {};
  card: any= {};

  constructor(
    private route: ActivatedRoute,
    private cartService: ShoppingCartService,
    private orderService: OrderService,
    private alertify: AlertifyService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data["user"];
    });

    this.productsInCart = this.cartService.getCartItemsFromCart();
    
    this.calcuateAllTotal(this.productsInCart);
    this.model.Amount = this.totalPrice;
    console.log(this.model);
  }
  calcuateAllTotal(allItems: Product[]) {
    let total = 0;
    for (let i in allItems) {
      total = total + allItems[i].Quantity * allItems[i].unitPrice;
    }
    this.totalPrice = total;
  }

  purchaseTicket(){
   console.log(this.model);
    (<any>window).Stripe.card.createToken(
      this.card,
    
      (status: number, response: any) => {
        if (status === 200) {
          this.model.token = response.id;
          this.http
            .post('http://localhost:5004/api/stripe', this.model)
            .subscribe(
              result => {
                console.log("Success");
              },
              error => {
                console.log(error);
              }
            );
        } else {
          console.log("BAD");
        }
      }
    );
  }
  confirmOrder() {
    console.log(this.model);
    var id = this.user.id;
    var name = this.user.username;

    const date: Date = new Date();
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var minutes = date.getMinutes();
    var hours = date.getHours();
    var seconds = date.getSeconds();
    var dateTimeStamp =
      day.toString() +
      monthIndex.toString() +
      year.toString() +
      minutes.toString() +
      hours.toString() +
      seconds.toString();

    let Order: any = {};
    
    Order.UserId = this.user.id;
    Order.UserName = this.user.username;

    Order.DeliveryAddress = this.model.deliveryAddress;
    Order.Phone = this.model.phone;

    this.orderItem = [];
   
    for (let i in this.productsInCart) {
      this.orderItem.push({
        Id: 0,
        ProductId: this.productsInCart[i].productId,
        ProductName: this.productsInCart[i].productName,
        OrderedQuantity: this.productsInCart[i].Quantity,
        UnitPrice: this.productsInCart[i].unitPrice,
        OrderId:0,
      });
    }
    Order.OrderItems = this.orderItem;

    console.log(Order);

    this.orderService.placeOrder(Order).subscribe(
      x => {
        this.alertify.success("Order has been placed "+x);
      },
      error => {
        this.alertify.error(error);
      }
    );
  }
  
}
