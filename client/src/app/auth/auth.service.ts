import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { LayoutService } from '../layout/layout.service';
import { LoginModel } from './login.model';
import { apiPath } from '../api.path';

import { Store } from '@ngrx/store';
import * as Auth from '../auth/auth.actions';
import * as Layout from '../layout/layout.actions';
import * as fromRoot from '../app.reducer';

@Injectable()
export class AuthService {
  private readonly interval$: Observable<any> = Observable.interval(1000);
  private subscription: Subscription;

  constructor(private readonly http: HttpClient,
    private readonly jwtHelper: JwtHelperService,
    private readonly router: Router,
    private readonly layoutService: LayoutService,
    private readonly store: Store<fromRoot.State>) { }

  private start() {
    this.subscription = this.interval$.subscribe(() => {
      if (this.token) {
        if (this.jwtHelper.isTokenExpired(this.token)) {
          this.logout();
          this.layoutService.showSnackbar('Automatic logout', null, 2000);
        }
      }
    });
  }

  private stop() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  init() {
    localStorage.clear();
    this.store.select(fromRoot.getIsAuthenticated).subscribe(
      authed => {
        if (authed) {
          this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/login']);
        }
      });
  }

  login(login: LoginModel): Observable<any> {
    this.store.dispatch(new Layout.ShowSpinner('Authentication...'));
    return this.http.post(apiPath(1, 'auth'), login)
      .map((data: any) => {
        localStorage.setItem('token', data.token);
        this.store.dispatch(new Auth.SetAuthenticated(this.jwtHelper.getTokenExpirationDate(this.token)));
        this.store.dispatch(new Layout.HideSpinner());
        this.start();

        this.layoutService.showSnackbar('Authenticated', null, 2000);
        return data;
      })
      .catch((err: HttpErrorResponse) => {
        this.store.dispatch(new Auth.SetUnauthenticated());
        this.store.dispatch(new Layout.HideSpinner());

        this.layoutService.showSnackbar(err.error.message, null, 2000);
        return Observable.throw(err);
      });
  }

  logout() {
    this.store.dispatch(new Auth.SetUnauthenticated());
    localStorage.clear();
    this.stop();
  }

  get token(): string {
    return localStorage.getItem('token');
  }

}
