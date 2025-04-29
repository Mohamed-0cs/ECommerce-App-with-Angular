import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from './user.service';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
})
export class EditUserDialogComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUser,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      userName: [data.userName, [Validators.required]],
      email: [data.email, [Validators.required, Validators.email]],
      displayName: [data.displayName, [Validators.required]],
      role: [data.role, [Validators.required]]
    });
  }

  onSave() {
    if (this.form.valid) {
      this.dialogRef.close({ ...this.data, ...this.form.value });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
} 