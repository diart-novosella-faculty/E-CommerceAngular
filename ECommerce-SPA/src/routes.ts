import { HomeComponent } from "./home/home.component";
import { ProductListComponent } from "./products/product-list/product-list.component";
import { Routes } from '@angular/router';
import { AuthGuard } from "./guards/auth.guard";

import { AdminDashboardComponent } from "./Admin/admin-dashboard/admin-dashboard.component";
import { ProductListResolver } from "./Resolvers/product-list.resolver";
import { EditProductComponent } from "./Admin/edit-product/edit-product.component";
import { ProductEditResolver } from "./Resolvers/product-edit.resolver";
import { PreventUnsavedChanges } from "./guards/prevent-unsaved-changes.guard";
import { ProductsDetailComponent } from "./products/products-detail/products-detail.component";
import { ProductDetailResolver } from "./Resolvers/product-detail.resolver";
import { CartItemsResolver } from "./Resolvers/cart-items.resolver";
import { AuthAdminGuard } from "./guards/auth.admin.guard";
import { UserEditComponent } from "./users/user-edit/user-edit.component";
import { UserEditResolver } from "./Resolvers/user-edit.resolver";
import { ShoppingCartComponent } from "./products/shopping-cart/shopping-cart.component";
import { CheckoutFormComponent } from "./checkout-form/checkout-form.component";

export const appRoutes: Routes = [
    {path: '',component:HomeComponent},
    
    {path:'AdminPanel',component:AdminDashboardComponent,canActivate:[AuthAdminGuard], resolve:{products:ProductListResolver}},
    {path:'product/edit/:id',component:EditProductComponent,canActivate:[AuthAdminGuard], resolve:{product:ProductEditResolver}, canDeactivate:[PreventUnsavedChanges]},
    {path:'products/cart',component:ShoppingCartComponent},
    {path:'checkout',component:CheckoutFormComponent,resolve:{user:UserEditResolver}},
    {
        path:'',
        canActivate:[AuthGuard],
        runGuardsAndResolvers: 'always',
        children:[
            {path:'products',component:ProductListComponent, resolve:{products:ProductListResolver}},  
            {path:'products/:id',component:ProductsDetailComponent,resolve:{product:ProductDetailResolver}},
            {path:'user/edit',component:UserEditComponent,resolve:{user:UserEditResolver}},
        ]
    },
    //WildCardRoute if not match redirectTo
    {path:"**",redirectTo:'',pathMatch:'full'}
] 