import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface IPhoto {
  imageName: string;
  productId: number;
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  newPrice: number;
  oldPrice: number;
  photos: IPhoto[];
  categoryName: string;
  rating: number;
}

export interface IPaginatedResponse<T> {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  data: T[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = environment.baseURL;

  constructor(private http: HttpClient) {}

  getAllProducts(pageNumber: number = 1, pageSize: number = 10): Observable<IPaginatedResponse<IProduct>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<IPaginatedResponse<IProduct>>(`${this.baseUrl}Products/get-all`, { params });
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}Products/delete-product/${id}`);
  }

  updateProduct(formData: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}Products/update-product`, formData);
  }

  addProduct(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}Products/add-product`, formData);
  }
} 