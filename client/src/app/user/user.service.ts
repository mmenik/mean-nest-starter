import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { LayoutService } from '../layout/layout.service';
import { UserModel } from './user.model';
import { apiPath } from '../api.path';

import { Store } from '@ngrx/store';
import * as Layout from '../layout/layout.actions';
import * as User from './user.actions';
import * as fromUser from './user.reducer';

@Injectable()
export class UserService {

    constructor(
        private readonly layoutService: LayoutService,
        private readonly http: HttpClient,
        private readonly store: Store<fromUser.State>
    ) { }

    fetch() {
        this.store.dispatch(new Layout.ShowSpinner('Load Users...'));
        this.http.get<UserModel[]>(apiPath(1, 'users'))
            .map((users: UserModel[]) => users)
            .catch((err: HttpErrorResponse) => Observable.throw(err))
            .subscribe(
                users => {
                    console.log('Users:', users);
                    this.store.dispatch(new Layout.HideSpinner());
                    this.store.dispatch(new User.SetUsers(users));
                    this.layoutService.showSnackbar('Load users successfully', null, 2000);
                },
                err => {
                    console.log('Fetch users error:', err);
                    this.store.dispatch(new Layout.HideSpinner());
                    this.layoutService.showSnackbar(err.error.message, null, 2000);
                }
            );
    }

    save(user: UserModel): Observable<UserModel> {
        console.log('User to save:', user);
        if (user._id) {
            return this.update(user);
        }
        return this.create(user);
    }

    create(newUser: UserModel): Observable<UserModel> {
        console.log('Create user:', newUser);
        this.store.dispatch(new Layout.ShowSpinner('Create user...'));
        return this.http.post<UserModel>(apiPath(1, 'users'), newUser)
            .map((user: UserModel) => {
                console.log(user);
                this.store.dispatch(new User.AddUser(user));
                this.store.dispatch(new Layout.HideSpinner());
                this.layoutService.showSnackbar('User created successfully', null, 2000);
                return user;
            })
            .catch((err: HttpErrorResponse) => {
                console.log('Create error:', err);
                this.store.dispatch(new Layout.HideSpinner());
                this.layoutService.showSnackbar(err.error.message, null, 2000);
                return Observable.throw(err);
            });
    }

    update(updateUser: UserModel): Observable<UserModel> {
        console.log('Update user:', updateUser);
        this.store.dispatch(new Layout.ShowSpinner('Update user...'));
        return this.http.put<UserModel>(apiPath(1, 'users'), updateUser)
            .map((user: UserModel) => {
                console.log(user);
                this.store.dispatch(new User.UpdateUser(user));
                this.store.dispatch(new Layout.HideSpinner());
                this.layoutService.showSnackbar('User updated successfully', null, 2000);
                return user;
            })
            .catch((err: HttpErrorResponse) => {
                console.log('Update error:', err.error);
                this.store.dispatch(new Layout.HideSpinner());
                this.layoutService.showSnackbar(err.error.message, null, 2000);
                return Observable.throw(err);
            });
    }

    delete(_id: string | number) {
        console.log('Delete user id:', _id);
        this.store.dispatch(new Layout.ShowSpinner('Delete user...'));
        const url = `${apiPath(1, 'users')}/${_id}`;
        console.log(url);
        this.http.delete<UserModel>(url)
            .map((user: UserModel) => {
                console.log('User deleted:', user);
                this.store.dispatch(new User.DeleteUser(user));
                this.store.dispatch(new Layout.HideSpinner());
                this.layoutService.showSnackbar('Delete user successfully', null, 2000);
            })
            .catch((err: HttpErrorResponse) => {
                console.log(err.error);
                this.store.dispatch(new Layout.HideSpinner());
                this.layoutService.showSnackbar(err.error.message, null, 2000);
                return Observable.throw(err);
            })
            .subscribe();
    }
}
