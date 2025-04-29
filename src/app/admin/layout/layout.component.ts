import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CoreService } from '../../core/core.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  isAdmin: boolean;

  constructor(private coreService: CoreService, private router: Router) {}

  ngOnInit(): void {
    this.isAdmin = true;
  }

  logout(): void {
    this.coreService.logout().subscribe(() => {
      this.router.navigate(['/']);  // بعد تسجيل الخروج، إعادة توجيه للمستخدم
    });
  }
}

