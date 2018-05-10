import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { UserEditComponent } from '../../components/user-edit/user-edit.component';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  view = 'table';
  isSearch = false;

  constructor(private readonly matDialog: MatDialog) { }

  ngOnInit() {
  }

  onNewUser() {
    const dialogRef: MatDialogRef<UserEditComponent> = this.matDialog.open(UserEditComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}
