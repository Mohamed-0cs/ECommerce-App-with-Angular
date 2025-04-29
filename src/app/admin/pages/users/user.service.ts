import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

export interface IUser {
  id: number;
  userName: string;
  email: string;
  displayName: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = environment.baseURL;
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.baseUrl + 'Account/GetAllUsers');
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'Account/DeleteUser/' + id);
  }

  updateUser(user: IUser) {
    return this.http.put(this.baseUrl + 'Account/UpdateUser/' + user.id, user);
  }

  addUser(user: IUser) {
    return this.http.post(this.baseUrl + 'Account/AddUser', user);
  }
} 