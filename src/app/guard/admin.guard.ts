// admin.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CoreService } from '../core/core.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private coreService: CoreService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.coreService.isAdmin$.pipe(
      map((isAdmin) => {
        if (!isAdmin) {
          this.router.navigate(['/']);  // إعادة التوجيه في حال عدم صلاحيات الـ Admin
          return false;
        }
        return true;
      })
    );
  }
}
