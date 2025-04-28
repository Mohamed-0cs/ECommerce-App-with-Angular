import { environment } from './../../environments/environment.development';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActiveAccount } from '../shared/Models/ActiveAccount';
import { ResetPassword } from '../shared/Models/ResetPassowrd';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {
  baseURL=environment.baseURL
  constructor(private http:HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = error.error.message || 'Server error';
    }
    return throwError(() => errorMessage);
  }

  register(form:any){
    return this.http.post(this.baseURL+"Account/Register",form).pipe(
      catchError(this.handleError)
    )
  }

  active(param:ActiveAccount){
    return this.http.post(this.baseURL+"Account/active-account",param).pipe(
      catchError(this.handleError)
    )
  }

  Login(form:any){
    return this.http.post(this.baseURL+"Account/Login",form).pipe(
      catchError(this.handleError)
    )
  }

  forgetPassword(email:string){
    return this.http.get(this.baseURL+`Account/send-email-forget-password?email=${email}`).pipe(
      catchError(this.handleError)
    )
  }

  ResetPassword(param:ResetPassword){
   return this.http.post(this.baseURL+"Account/reset-password",param).pipe(
      catchError(this.handleError)
    )
  }
}
