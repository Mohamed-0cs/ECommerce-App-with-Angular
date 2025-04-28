import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
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
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then((m) => m.AboutModule),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
