import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/models/product';
import { ShoppingCartService } from 'src/services/cart.service';
import { AlertifyService } from 'src/services/alertify.service';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-card',
  templateUrl: './products-card.component.html',
  styleUrls: ['./products-card.component.css']
})
export class ProductsCardComponent implements OnInit {
  @Input() product: Product;

  //new added
  products:Product[];
  //
  mainPhotoUrl: string;
  cartCount:number;
  productAddedToCart: Product[];
  constructor(private router: Router,private cartService:ShoppingCartService,private alertify:AlertifyService,private authService:AuthService) { }

  ngOnInit() {



   
    this.getMainPhoto();
    
    /*
    this.cartService.getCartItems(this.authService.decodedToken.nameid).subscribe(n=>{
      this.cartService.changeItemCounter(n.length);
    });
    */ 
    //this.cartService.currentItemCounter.subscribe(cartCount=>this.cartCount = cartCount);
  
  }
  getMainPhoto() {
    for (let i = 0; i < this.product.photos.length; i++) {
      if (this.product.photos[i].isMain) {
        this.mainPhotoUrl = this.product.photos[i].url;
        this.product.mainPhotoUrl = this.mainPhotoUrl;
      }
    }
  }

  addToCart(product:Product){
     this.productAddedToCart =  this.cartService.getCartItemsFromCart();
    //there are no items in the cart
     if(this.productAddedToCart == null){
       this.productAddedToCart = [];
       this.productAddedToCart.push(product);
       this.cartService.addProductToCart(this.productAddedToCart);
       this.alertify.success("Product added to cart");
     }
     else
     //there are some items in the cart
     {
       //check if this item is already in the cart
        let tempProduct = this.productAddedToCart.find(p=>p.productId == product.productId);
        if(tempProduct == null){
          this.productAddedToCart.push(product);
          this.cartService.addProductToCart(this.productAddedToCart);
          this.alertify.success("Added to cart");
        }
        else{
          this.alertify.error("This item is already in the cart");
        }
     }
     
     this.cartCount = this.productAddedToCart.length;
     this.cartService.changeItemCounter(this.cartCount);
   
  }

}
