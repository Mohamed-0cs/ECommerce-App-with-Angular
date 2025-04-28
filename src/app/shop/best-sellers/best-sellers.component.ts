import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { IProduct } from '../../shared/Models/Product';
import { ProductParam } from '../../shared/Models/ProductParam';

@Component({
  selector: 'app-best-sellers',
  templateUrl: './best-sellers.component.html',
  styleUrls: ['./best-sellers.component.scss']
})
export class BestSellersComponent implements OnInit {
  bestSellers: IProduct[] = [];
  productParams = new ProductParam();

  constructor(private shopService: ShopService) {
    this.productParams.pageSize = 6;
    this.productParams.pageNumber = 1;
    this.productParams.SortSelected = 'PriceDce'; // Sort by highest price first to simulate best sellers
  }

  ngOnInit() {
    this.loadBestSellers();
  }

  loadBestSellers() {
    this.shopService.getProduct(this.productParams).subscribe({
      next: response => {
        if (response) {
          this.bestSellers = response.data;
        }
      },
      error: error => console.log(error)
    });
  }
}
