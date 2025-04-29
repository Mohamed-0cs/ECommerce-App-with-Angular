import { Component, OnInit } from '@angular/core';
import { BasketService } from '../basket.service';
import { IBasket, IBasketItem } from '../../shared/Models/Basket';
import { ImageService } from '../../core/Services/image.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent implements OnInit {
  environment = environment;
  
  constructor(
    private basketService: BasketService,
    private imageService: ImageService
  ) {}
      
  basket: IBasket;

  getImageUrl(imagePath: string | null): string {
    return this.imageService.getFullImageUrl(imagePath);
  }

  ngOnInit(): void {
    this.basketService.basket$.subscribe({
      next:(value)=> {
        this.basket = value;
        console.log('Basket Items:', value?.basketItems);
      },
      error(err) {
        console.log(err);
      },
    })
  }
  RemoveBasket(item:IBasketItem){
    this.basketService.removeItemFormBasket(item)
  }
  incrementQuantity(item:IBasketItem){
    this.basketService.incrementBasketItemQuantity(item);
  }
  DecrementQuantity(item:IBasketItem){
    this.basketService.DecrementBasketItemQuantity(item);
  }
 

}
