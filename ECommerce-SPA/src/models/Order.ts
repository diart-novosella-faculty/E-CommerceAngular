import { OrderItem } from "./OrderItem";

export interface Order {
  OrderId:number;
  UserId: number;
  UserName:string;
  DeliveryAddress:string;
  Phone:string;
  OrderItems:OrderItem[];
}