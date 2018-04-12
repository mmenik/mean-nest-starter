import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { UserDto } from '../../../../../shared/src/dto/user.dto';
import { UserService } from '../user.service';

import { Store } from '@ngrx/store';
import * as fromUser from '../user.reducer';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  public matTableDataSource = new MatTableDataSource<UserDto>();
  public matTableDataSourceColumns = ['username', 'firstname', 'lastname', 'actions'];

  constructor(
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
  }

  onDelete(element: UserDto) {
    this.userService.delete(element._id);
  }
}
