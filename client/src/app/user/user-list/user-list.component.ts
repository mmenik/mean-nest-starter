import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatDialogRef, MatSort, MatPaginator } from '@angular/material';
import { UserService } from '../user.service';

import { Store } from '@ngrx/store';
import * as fromUser from '../user.reducer';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { UserModel } from '../user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) matSort: MatSort;
  @ViewChild(MatPaginator) matPaginator: MatPaginator;

  public matTableDataSource = new MatTableDataSource<UserModel>();
  public matTableDataSourceColumns = ['username', 'firstname', 'lastname', 'actions'];

  constructor(
    private readonly matDialog: MatDialog,
    private readonly userService: UserService,
    private readonly store: Store<fromUser.State>
  ) { }

  ngOnInit() {
    this.store.select(fromUser.getUsers).subscribe(
      (users: UserModel[]) => {
        this.matTableDataSource.data = users;
      }
    );
    this.userService.fetch();
  }

  ngAfterViewInit() {
    this.matTableDataSource.sort = this.matSort;
    this.matTableDataSource.paginator = this.matPaginator;
  }

  onEdit(element: UserModel) {
    const dialogRef: MatDialogRef<UserEditComponent> = this.matDialog.open(UserEditComponent, {
      data: element
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  onDelete(element: UserModel) {
    this.userService.delete(element._id);
  }
}
