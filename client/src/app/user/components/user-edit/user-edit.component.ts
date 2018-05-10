import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../../app.reducer';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  public form: FormGroup;
  public title: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public user: User,
    private dialogRef: MatDialogRef<UserEditComponent>,
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
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
      (user: User) => {
        this.user = user;
        this.form.reset(this.user);
      }
    );
  }
}
