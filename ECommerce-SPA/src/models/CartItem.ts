import { Photo } from "./Photo";
import { Product } from "./product";

export interface CartItem{
    product:Product;
   // productName:string;
   // unitPrice:number;
    count?:number;
   // mainPhotoUrl?:string;
    //totalPrice?:number;
}