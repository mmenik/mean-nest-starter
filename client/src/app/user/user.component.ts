import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { UserEditComponent } from './user-edit/user-edit.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  view = 'table';
  isSearch = false;

  constructor(private readonly dialog: MatDialog) { }

  ngOnInit() {
  }

  onNewUser() {
    const dialogRef: MatDialogRef<UserEditComponent, any> = this.dialog.open(UserEditComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}
