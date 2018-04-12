import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  public form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private readonly data: any,
    private dialogRef: MatDialogRef<UserEditComponent>,
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    console.log('init dialog data passed:', this.data);
    this.store.select(fromRoot.getIsAuthenticated).subscribe(isAuth => {
      if (!isAuth) {
        this.dialogRef.close();
      }
    });
    this.form = this.fb.group({
      username: ['', <any>Validators.required],
      password: ['', <any>Validators.required],
      firstname: [''],
      lastname: ['']
    });
  }

  onSubmit() {
    console.log(this.form.value);
    this.userService.create(this.form.value).subscribe(
      user => {
        console.log(user);
      },
      err => {
        console.log(err);
      }
    );
  }
}
