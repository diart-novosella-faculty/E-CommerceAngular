import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable, throwError } from "rxjs";
import { Product } from "src/models/product";
import { Order } from "src/models/Order";
import { map, catchError } from "rxjs/operators";

@Injectable({
    providedIn:'root'
})

export class OrderService{

    constructor(private http:HttpClient){}
   
    placeOrder (orderDetail:Order)
    {
   
            
      return this.http.post("http://localhost:5004/api/orders",orderDetail)
      .pipe(
        map(res => res),
         catchError( this.errorHandler)
        );
    }
    errorHandler(error: Response) {  
        console.log(error);  
        return throwError(error);  
    } 
}
