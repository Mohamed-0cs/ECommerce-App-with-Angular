import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  constructor(private http: HttpClient) {}
  baseURL = environment.baseURL;
  private name = new BehaviorSubject<string>('');
  userName$ = this.name.asObservable();
  private isAdmin = new BehaviorSubject<boolean>(false);  // لحفظ حالة الـ Admin
  isAdmin$ = this.isAdmin.asObservable(); 

  checkIfAdmin() {
    return this.http.get(this.baseURL + 'Account/get-user-role').pipe(  // افترضنا أن API يرجع الـ role
      map((value: any) => {
        if (value.role === 'Admin') {
          this.isAdmin.next(true);
        } else {
          this.isAdmin.next(false);
        }
      })
    );
  }

  logout() {
    return this.http.get(this.baseURL + 'Account/Logout').pipe(
      map(() => {
        this.name.next('');
        this.isAdmin.next(false);  // عند تسجيل الخروج نعيد تعيين حالة الـ Admin
      })
    );
  }

  getUserName() {
    return this.http.get(this.baseURL + 'Account/get-user-name').pipe(
      map((value: any) => {
        this.name.next(value.message);
      })
    );
  }
}
