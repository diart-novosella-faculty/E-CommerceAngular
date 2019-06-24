import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable,BehaviorSubject } from "rxjs";
import { Product } from "src/models/product";
import { User } from "src/models/User";
import { CartItem } from "src/models/CartItem";

@Injectable({
    providedIn:'root'
})

export class ShoppingCartService{
    cartItemCounter = new BehaviorSubject<number>(0);
    currentItemCounter = this.cartItemCounter.asObservable();

    changeItemCounter(cartLength:number){
        this.cartItemCounter.next(cartLength);
    }

    constructor(private http:HttpClient){}

    getCartItems(id):Observable<CartItem[]>{
        return this.http.get<CartItem[]>("http://localhost:5003/api/cart/"+id);
    }

    addToCart(userid:number,model:any){
        return this.http.post("http://localhost:5003/api/cart/"+userid,model);
    }

    getCartItemsFromCart(){
        return JSON.parse(localStorage.getItem('product'));
    }
    addProductToCart(products:any){
        localStorage.setItem("product",JSON.stringify(products));
    }
    removeAllProductsFromCart(){
        return localStorage.removeItem("product");
    }

}