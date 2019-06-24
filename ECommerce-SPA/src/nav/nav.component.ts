import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/services/alertify.service';
import { ShoppingCartService } from 'src/services/cart.service';
import { CartItem } from 'src/models/CartItem';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  cartItemCounter:number;
  cartItems: CartItem[];
  model: any = {}; // empty object that will store our username and password
  
  constructor(private cartService:ShoppingCartService,public authService: AuthService, private router: Router, private alertify: AlertifyService) { }

  ngOnInit() {
    //this.cartCounter = parseInt(localStorage.getItem('count'));
    this.cartService.currentItemCounter.subscribe(cartItemCounter=>this.cartItemCounter = cartItemCounter);
    
    
    
   // this.cartService.currentItemCounter.subscribe(cartCounter=>this.cartCounter = this.cartCounter);
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success("Logged in successfully");
    }, error => {
      this.alertify.error(error);
    }, () => {
      // check if role from token is Admin go to products user page
      // else go to products admin page
      if(this.authService.loggedInAdmin()){
        this.router.navigate(['/AdminPanel']);
      }else{
        this.router.navigate(['/products']);
      }
    });
  }
  loggedIn() {
    return this.authService.loggedIn();
  }
  logOut() {
    localStorage.removeItem('token');
    this.authService.decodedToken = null;

    this.alertify.message("logged out");
    this.router.navigate(['/home']);
  }
}
