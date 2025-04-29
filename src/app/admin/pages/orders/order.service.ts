import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

export interface IOrderItem {
  productItemId: number;
  mainImage: string;
  productName: string;
  price: number;
  quntity: number;
}

export interface IShippingAddress {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  zipCode: string;
  street: string;
  state: string;
}

export interface IOrder {
  id: number;
  buyerEmail: string;
  subTotal: number;
  total: number;
  orderDate: string;
  shippingAddress: IShippingAddress;
  orderItems: IOrderItem[];
  deliveryMethod: string;
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseUrl = environment.baseURL;
  constructor(private http: HttpClient) {}

  getAllOrders(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(this.baseUrl + 'Orders/get-orders-for-user');
  }

  deleteOrder(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'Orders/delete/' + id);
  }
} 