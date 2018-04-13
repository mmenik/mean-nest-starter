import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import { UserModel } from '../../../../../shared/src/model/user.model';
import { UserDto } from '../../../../../shared/src/dto/user.dto';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  public form: FormGroup;
  public title: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public user: UserModel,
    private dialogRef: MatDialogRef<UserEditComponent>,
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    console.log('init dialog data passed:', this.user);
    this.title = `${this.user ? 'Edit' : 'New'} User`;
    this.store.select(fromRoot.getIsAuthenticated).subscribe(isAuth => {
      if (!isAuth) {
        this.dialogRef.close();
      }
    });
    this.form = this.fb.group({
      username: [{ value: this.user ? this.user.username : '', disabled: this.user }, <any>Validators.required],
      password: [{ value: this.user ? this.user.password : '', disabled: this.user }, <any>Validators.required],
      firstname: [this.user ? this.user.firstname : ''],
      lastname: [this.user ? this.user.lastname : '']
    });
  }

  onSubmit() {
    if (this.user) {
      this.user = {
        ...this.user,
        firstname: this.form.value.firstname, lastname: this.form.value.lastname
      };
    } else {
      this.user = this.form.value;
    }
    this.userService.save(this.user).subscribe(
      (user: UserModel) => {
        this.user = user;
        this.form.reset(this.user);
      }
    );
  }
}
