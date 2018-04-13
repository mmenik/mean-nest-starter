import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UserDto } from '../../../../shared/src/dto/user.dto';
import { apiPath } from '../../../../shared/src/api.path';

import { LayoutService } from '../layout/layout.service';

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
        this.http.get<UserDto[]>(apiPath(1, 'users'))
            .map((users: UserDto[]) => users)
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

    save(user: UserDto): Observable<UserDto> {
        console.log('User to save:', user);
        if (user._id) {
            return this.update(user);
        }
        return this.create(user);
    }

    create(newUser: UserDto): Observable<UserDto> {
        console.log('Create user:', newUser);
        this.store.dispatch(new Layout.ShowSpinner('Create user...'));
        return this.http.post<UserDto>(apiPath(1, 'users'), newUser)
            .map((user: UserDto) => {
                console.log(user);
                this.store.dispatch(new Layout.HideSpinner());
                this.layoutService.showSnackbar('User created successfully', null, 2000);
                return user;
            })
            .catch((err: HttpErrorResponse) => {
                console.log('Create error:', err.error);
                this.store.dispatch(new Layout.HideSpinner());
                this.layoutService.showSnackbar(err.error.message, null, 2000);
                return Observable.throw(err);
            });
    }

    update(updateUser: UserDto): Observable<UserDto> {
        console.log('Update user:', updateUser);
        this.store.dispatch(new Layout.ShowSpinner('Update user...'));
        return this.http.put<UserDto>(apiPath(1, 'users'), updateUser)
            .map((user: UserDto) => {
                console.log(user);
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
        this.http.delete<UserDto>(url)
            .map((user: UserDto) => {
                console.log('User deleted:', user);
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
