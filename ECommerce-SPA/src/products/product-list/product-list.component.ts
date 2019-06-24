import { Component, OnInit } from '@angular/core';
import { Product } from 'src/models/product';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/services/alertify.service';
import { ShoppingCartService } from 'src/services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products:Product[];
  constructor(private alertify:AlertifyService,private route:ActivatedRoute,private cartService:ShoppingCartService) { }

  ngOnInit() {
    this.route.data.subscribe(data =>{
      this.products = data['products'];
    })
   
  }
  

}
