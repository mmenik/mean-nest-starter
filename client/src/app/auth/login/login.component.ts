import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import { LoginModel } from '../login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private readonly authService: AuthService,
    private readonly fb: FormBuilder,
    private readonly store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', <any>Validators.required],
      password: ['', <any>Validators.required]
    });
  }

  onSubmit() {
    const login: LoginModel = {
      username: this.form.value.username,
      password: this.form.value.password
    };

    this.authService.login(login).subscribe(
      data => { },
      err => {
        this.form.reset();
      }
    );

    // this.form.controls.username.setValue('');
    // this.form.controls.username.markAsPristine();
    // this.form.controls.username.markAsUntouched();
    // this.form.controls.username.updateValueAndValidity();
  }
}
