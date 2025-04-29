import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop/shop.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './shop/product-details/product-details.component';
import { authGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'shop',
    loadChildren: () => import('./shop/shop.module').then((m) => m.ShopModule),

  },
  {
    path: 'basket',
    loadChildren: () => import('./basket/basket.module').then((m) => m.BasketModule),

  },
  {
    path: 'checkout',
    loadChildren: () => import('./checkout/checkout.module').then((m) => m.CheckoutModule),
    canActivate:[authGuard]
  },
  {
    path: 'Account',
    loadChildren: () => import('./identity/identity.module').then((m) => m.IdentityModule),

  },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.module').then((m) => m.OrdersModule),
    canActivate:[authGuard]
  },
  // {
    
  //     path: 'login',
  //     // loadChildren: () => import('./login/login.module').then(m => m.LoginModule) 

  // },
  {
    path:'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
