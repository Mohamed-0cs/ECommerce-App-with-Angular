import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { BestSellersComponent } from './best-sellers/best-sellers.component';

const routes: Routes = [
  { path: '', component: ShopComponent },
  { path: 'best-sellers', component: BestSellersComponent },
  { path: 'product-details/:id', component: ProductDetailsComponent },
];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopRoutingModule {}
