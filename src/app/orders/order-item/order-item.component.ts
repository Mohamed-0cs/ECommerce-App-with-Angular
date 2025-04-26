import { Component, OnInit } from '@angular/core';
import { IOrder } from '../../shared/Models/Order';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../orders.service';
import { IRating } from '../../shared/Models/rating';
import { ToastrService } from 'ngx-toastr';
declare var bootstrap: any;

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.scss',
})
export class OrderItemComponent implements OnInit {
  order: IOrder;
  id: number = 0;
  rating:IRating={
    productId:0,
    content:'',
    stars:0
  }
  constructor(private route: ActivatedRoute, private _service: OrdersService,private toast:ToastrService) {}
  ngOnInit(): void {
    debugger;
    this.route.queryParams.subscribe((param) => {
      this.id = param['id'];
    });

    this._service.getCurrentOrderForUser(this.id).subscribe({
      next: (response) => {
        this.order = response;
        console.log(this.order);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  setProductId(id:number){
    this.rating.productId=id;
    console.log(this.rating);
    
    var modal = document.getElementById('ModalCenter');
    var modalElement = new bootstrap.Modal(modal);
    modalElement.show();
  }
  close(){
    var modal = document.getElementById('ModalCenter');
    var modalClose=bootstrap.Modal.getInstance(modal);
    modalClose.hide();
  }
  UpdateRating(stars:number){
    this.rating.stars=stars;
    console.log(this.rating);
    
  }
  submit(){
    this._service.addrating(this.rating).subscribe({
      next:res=>{
        this.close()
        this.toast.success("Rating Added Successfully",'SUCCESS')
      },
      error:(err)=> {
        this.close()
        this.toast.error("you are already Review this product","ERROR")
        
      },
    })
  }
}
