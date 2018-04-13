import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog, MatDialogRef } from '@angular/material';
import { UserDto } from '../../../../../shared/src/dto/user.dto';
import { UserService } from '../user.service';

import { Store } from '@ngrx/store';
import * as fromUser from '../user.reducer';
import { UserEditComponent } from '../user-edit/user-edit.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  public matTableDataSource = new MatTableDataSource<UserDto>();
  public matTableDataSourceColumns = ['username', 'firstname', 'lastname', 'actions'];

  constructor(
    private readonly dialog: MatDialog,
    private readonly userService: UserService,
    private readonly store: Store<fromUser.State>
  ) { }

  ngOnInit() {
    this.store.select(fromUser.getUsers).subscribe(
      (users: UserDto[]) => {
        this.matTableDataSource.data = users;
      }
    );
    this.userService.fetch();
  }

  onEdit(element: UserDto) {
    const dialogRef: MatDialogRef<UserEditComponent> = this.dialog.open(UserEditComponent, {
      data: element
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  onDelete(element: UserDto) {
    this.userService.delete(element._id);
  }
}
