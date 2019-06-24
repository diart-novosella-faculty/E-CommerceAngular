import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { RouterModule } from '@angular/router';
import { FileUploadModule } from 'ng2-file-upload';
import { NgxGalleryModule } from 'ngx-gallery';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { appRoutes } from '../routes';

import { AppComponent } from './app.component';
import { NavComponent } from '../nav/nav.component';
import { HomeComponent } from '../home/home.component';
import { ProductListComponent } from '../products/product-list/product-list.component';
import { RegisterComponent } from '../register/register.component';
import { CreateProductComponent } from '../Admin/create-product/create-product.component';
import { AdminDashboardComponent } from '../Admin/admin-dashboard/admin-dashboard.component';
import { ProductsCardComponent } from 'src/products/products-card/products-card.component';
import { CheckoutFormComponent } from 'src/checkout-form/checkout-form.component';

import { AuthService } from '../services/auth.service';
import { AlertifyService } from '../services/alertify.service';
import { ErrorInterceptorProvider } from 'src/services/error.interceptor';
import { from } from 'rxjs';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ProductListResolver } from 'src/Resolvers/product-list.resolver';
import { ProductEditResolver } from 'src/Resolvers/product-edit.resolver';

import { EditProductComponent } from 'src/Admin/edit-product/edit-product.component';
import { PreventUnsavedChanges } from 'src/guards/prevent-unsaved-changes.guard';
import { PhotoEditorComponent } from 'src/Admin/photo-editor/photo-editor.component';
import { ProductsDetailComponent } from 'src/products/products-detail/products-detail.component';
import { ProductDetailResolver } from 'src/Resolvers/product-detail.resolver';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { UserEditComponent } from 'src/users/user-edit/user-edit.component';
import { UserEditResolver } from 'src/Resolvers/user-edit.resolver';
import { ShoppingCartService } from 'src/services/cart.service';
import { ShoppingCartComponent } from 'src/products/shopping-cart/shopping-cart.component';
import { CartItemsResolver } from 'src/Resolvers/cart-items.resolver';
import { OrderService } from 'src/services/order.service';




@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      ProductListComponent,
      CreateProductComponent,
      AdminDashboardComponent,
      EditProductComponent,
      PhotoEditorComponent,
      ProductsCardComponent,
      ProductsDetailComponent,
      UserEditComponent,
      ShoppingCartComponent,
      CheckoutFormComponent,
      
   ],
   imports: [
      BrowserModule,
      FormsModule,
      HttpClientModule,
      BsDropdownModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      TabsModule.forRoot(),
      MDBBootstrapModule.forRoot(),
      FileUploadModule,
      NgxGalleryModule,
      ReactiveFormsModule,
      CollapseModule.forRoot(),
      BrowserAnimationsModule
   ],
   providers: [
      AuthService,
      AlertifyService,
      ProductListResolver,
      ProductEditResolver,
      PreventUnsavedChanges,
      ErrorInterceptorProvider,
      ProductDetailResolver,
      UserEditResolver,
      ShoppingCartService,
      CartItemsResolver,
      OrderService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
