import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ShopItemComponent } from './shop-item/shop-item.component';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { ShopRoutingModule } from './shop-routing.module';
import { BestSellersComponent } from './best-sellers/best-sellers.component';




@NgModule({
  declarations: [
    ShopComponent,
    ShopItemComponent,
    ProductDetailsComponent,
    BestSellersComponent
  ],
  imports: [
    ShopRoutingModule,
    CommonModule,
    SharedModule,
    NgxImageZoomModule,
  ],
  exports:[
    ShopItemComponent
  ]
})
export class ShopModule { }
