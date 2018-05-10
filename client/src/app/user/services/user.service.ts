import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { apiPath } from '../../shared/api.path';

import { AuthService } from '../../auth/services/auth.service';
import { LayoutService } from '../../core/services/layout.service';

import { User } from '../models/user.model';

import { Store } from '@ngrx/store';
import { LayoutActionTypes, ShowSpinner, HideSpinner, UpdateSpinner } from '../../core/store/actions/layout.actions';
import { UserActionTypes, CreateUser, ReadUsers, UpdateUser, DeleteUser } from '../store/actions/user.actions';
import * as fromUser from '../store/reducers/user.reducer';

@Injectable()
export class UserService {

    constructor(
        private readonly authService: AuthService,
        private readonly layoutService: LayoutService,
        private readonly http: HttpClient,
        private readonly store: Store<fromUser.State>
    ) { }

    read() {
        this.store.dispatch(new ShowSpinner('Load Users...'));
        this.http.get<User[]>(apiPath(1, 'users'))
            .map((users: User[]) => users)
            .catch((err: HttpErrorResponse) => Observable.throw(err))
            .subscribe(
                users => {
                    this.store.dispatch(new HideSpinner());
                    this.store.dispatch(new ReadUsers(users));
                    this.layoutService.showSnackbar('Load users successfully', null, 2000);
                    this.authService.renew();
                },
                err => {
                    this.store.dispatch(new HideSpinner());
                    this.layoutService.showSnackbar(err.error.message, null, 2000);
                }
            );
    }

    save(user: User): Observable<User> {
        if (user._id) {
            return this.update(user);
        }
        return this.create(user);
    }

    create(newUser: User): Observable<User> {
        this.store.dispatch(new ShowSpinner('Create user...'));
        return this.http.post<User>(apiPath(1, 'users'), newUser)
            .map((user: User) => {
                this.store.dispatch(new CreateUser(user));
                this.store.dispatch(new HideSpinner());
                this.layoutService.showSnackbar('User created successfully', null, 2000);
                return user;
            })
            .catch((err: HttpErrorResponse) => {
                this.store.dispatch(new HideSpinner());
                this.layoutService.showSnackbar(err.error.message, null, 2000);
                return Observable.throw(err);
            });
    }

    update(updateUser: User): Observable<User> {
        this.store.dispatch(new ShowSpinner('Update user...'));
        return this.http.put<User>(apiPath(1, 'users'), updateUser)
            .map((user: User) => {
                this.store.dispatch(new UpdateUser(user));
                this.store.dispatch(new HideSpinner());
                this.layoutService.showSnackbar('User updated successfully', null, 2000);
                return user;
            })
            .catch((err: HttpErrorResponse) => {
                this.store.dispatch(new HideSpinner());
                this.layoutService.showSnackbar(err.error.message, null, 2000);
                return Observable.throw(err);
            });
    }

    delete(_id: string | number) {
        this.store.dispatch(new ShowSpinner('Delete user...'));
        const url = `${apiPath(1, 'users')}/${_id}`;
        this.http.delete<User>(url)
            .map((user: User) => {
                this.store.dispatch(new DeleteUser(user));
                this.store.dispatch(new HideSpinner());
                this.layoutService.showSnackbar('Delete user successfully', null, 2000);
            })
            .catch((err: HttpErrorResponse) => {
                this.store.dispatch(new HideSpinner());
                this.layoutService.showSnackbar(err.error.message, null, 2000);
                return Observable.throw(err);
            })
            .subscribe();
    }
}
