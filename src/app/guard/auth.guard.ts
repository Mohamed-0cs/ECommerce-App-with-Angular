import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const _service = inject(HttpClient);
  const router = inject(Router);
  const baseURL = environment.baseURL;

  return _service.get(baseURL + "Account/IsUserAuth").pipe(
    map(() => true),
    catchError(() => {
      router.navigate(["/Account/Login"], { queryParams: { returnUrl: state.url } });
      return of(false);
    })
  );
// return true ;
};
