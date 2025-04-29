import { Component, OnInit } from '@angular/core';
import { UserService, IUser } from './user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EditUserDialogComponent } from './edit-user-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'userName', 'email', 'displayName', 'role', 'actions'];
  dataSource = new MatTableDataSource<IUser>([]);
  loading = false;

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.loading = true;
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.dataSource.data = users;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  deleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe(() => {
        this.fetchUsers();
      });
    }
  }

  openEditDialog(user: IUser) {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '400px',
      data: { ...user }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.updateUser(result).subscribe(() => {
          this.fetchUsers();
        });
      }
    });
  }

  openAddDialog() {
    const emptyUser: IUser = { id: 0, userName: '', email: '', displayName: '', role: '' };
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '400px',
      data: emptyUser
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.addUser(result).subscribe(() => {
          this.fetchUsers();
        });
      }
    });
  }
}
