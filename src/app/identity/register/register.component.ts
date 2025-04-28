import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IdentityService } from '../identity.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  fromGroup: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private _service: IdentityService,
    private toast: ToastrService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.formValidation();
  }

  formValidation() {
    this.fromGroup = this.fb.group({
      UserName: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      DisplayName: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[0-9])(?=.*[#$@!.\-])[A-Za-z\d#$@!.\-]{8,}$/),
        ],
      ],
    });
  }

  get _username() {
    return this.fromGroup.get('UserName');
  }
  get _email() {
    return this.fromGroup.get('email');
  }
  get _DisplayName() {
    return this.fromGroup.get('DisplayName');
  }
  get _password() {
    return this.fromGroup.get('password');
  }

  Submit() {
    if (this.fromGroup.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this._service.register(this.fromGroup.value).subscribe({
        next: (value) => {
          this.toast.success("Register success, please confirm your email", 'SUCCESS');
          this.route.navigateByUrl('/Account/Login');
        },
        error: (err) => {
          console.error('Registration error:', err);
          this.toast.error(
            typeof err === 'string' ? err : 'Registration failed. Please try again.',
            'ERROR'
          );
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
    }
  }
}
