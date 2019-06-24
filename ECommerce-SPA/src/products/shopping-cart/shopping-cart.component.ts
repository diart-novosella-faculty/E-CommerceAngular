import { Component, OnInit } from "@angular/core";
import { CartItem } from "src/models/CartItem";
import { ShoppingCartService } from "src/services/cart.service";
import { AuthService } from "src/services/auth.service";
import { AlertifyService } from "src/services/alertify.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "src/services/product.service";
import { Product } from "src/models/product";
import { count } from "rxjs/operators";

@Component({
  selector: "app-shopping-cart",
  templateUrl: "./shopping-cart.component.html",
  styleUrls: ["./shopping-cart.component.scss"]
})
export class ShoppingCartComponent implements OnInit {
  dafualtQuantity:number=1;
  totalPrice: number;
  productsInCart: Product[];

  



  constructor(
    private cartSerivce: ShoppingCartService,
    private authService: AuthService,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
    private productService: ProductService,private router: Router
  ) {}

  ngOnInit() {
    this.productsInCart = this.cartSerivce.getCartItemsFromCart();

    for (let i in this.productsInCart) {
      this.productsInCart[i].Quantity = 1;
    }
    this.cartSerivce.removeAllProductsFromCart();
    this.cartSerivce.addProductToCart(this.productsInCart);

    this.calcuateAllTotal(this.productsInCart);


    
  }

  calcuateAllTotal(allItems: Product[]) {
    let total = 0;
    for (let i in allItems) {
      total = total + allItems[i].Quantity * allItems[i].unitPrice;
    }
    this.totalPrice = total;
  }
  clearShoppingCart() {
    this.cartSerivce.removeAllProductsFromCart();
    this.productsInCart = [];
    this.cartSerivce.changeItemCounter(0);
    this.totalPrice = 0;
  }
  deleteCartItem(product: Product) {
    let productToBeDeleted = this.productsInCart.find(
      p => p.productId == product.productId
    );
    this.totalPrice -= productToBeDeleted.unitPrice;
    var index = this.productsInCart.indexOf(productToBeDeleted);
    if (index > -1) {
      this.productsInCart.splice(index, 1);
    }
    this.cartSerivce.removeAllProductsFromCart();
    this.cartSerivce.addProductToCart(this.productsInCart);
    this.cartSerivce.changeItemCounter(this.productsInCart.length);

  }

  onAddQuantity(product:Product) {  
 
    this.productsInCart = this.cartSerivce.getCartItemsFromCart();
    this.productsInCart.find(p=>p.productId == product.productId).Quantity = product.Quantity+1;
    //let tempProduct = this.productsInCart.find(p=>p.productId == product.productId);
    this.dafualtQuantity +=this.dafualtQuantity;
    this.cartSerivce.removeAllProductsFromCart();
    this.cartSerivce.addProductToCart(this.productsInCart);

    this.calcuateAllTotal(this.productsInCart);

  }

  onRemoveQuantity(product:Product) {  
    this.productsInCart = this.cartSerivce.getCartItemsFromCart();
    this.productsInCart.find(p=>p.productId == product.productId).Quantity = product.Quantity-1;

    this.cartSerivce.removeAllProductsFromCart();
    this.cartSerivce.addProductToCart(this.productsInCart);

    this.calcuateAllTotal(this.productsInCart);

  }
  checkoutForm(){
    this.router.navigate(['checkout']);
  }
  
}
