import { Injectable } from "@angular/core";

import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { AlertifyService } from "../services/alertify.service";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { ProductService } from "src/services/product.service";
import { Product } from "src/models/product";
import { CartItem } from "src/models/CartItem";
import { ShoppingCartService } from "src/services/cart.service";
import { AuthService } from "src/services/auth.service";

@Injectable()
export class CartItemsResolver implements Resolve<CartItem[]> {
  //With this resolver now we will get data from our Route not the member-detail onInit method
  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private cartService: ShoppingCartService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  //we need to implement resolve method
  
    resolve(route: ActivatedRouteSnapshot): Observable<CartItem[]> {
        return this.cartService.getCartItems(this.authService.decodedToken.nameid).pipe(
            catchError(error => {
                this.alertify.error("Problem retrieving data");

                return of(null);
            })
        )
    }
    
    
  
  
}
