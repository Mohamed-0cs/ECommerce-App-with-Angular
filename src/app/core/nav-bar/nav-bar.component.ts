import { Component, OnInit } from '@angular/core';
import { BasketService } from '../../basket/basket.service';
import { Observable } from 'rxjs';
import { IBasket } from '../../shared/Models/Basket';
import { CoreService } from '../core.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent implements OnInit {
  userName: string = '';
  visibale: boolean = false;

  constructor(
    private basketService: BasketService,
    private _service: CoreService,
    private router:Router
  ) {}
  count: Observable<IBasket>;
  ngOnInit(): void {
    const basketId = localStorage.getItem('basketId');

    this.basketService.GetBasket(basketId).subscribe({
      next: (value) => {
        console.log(value);
        this.count = this.basketService.basket$;
      },
      error(err) {
        console.log(err);
      },
    });
    this._service.getUserName().subscribe();
    this._service.userName$.subscribe(value=>{
      this.userName=value;
    })
  }
  logout(){ 
    this._service.logout().subscribe({
      next:()=>{
        this.router.navigateByUrl('/')
      }
    })
  }
  ToggleDropDown() {
    this.visibale = !this.visibale;
  }
}
