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
                },
                err => {
                    console.log('Fetch users error:', err);
                    this.store.dispatch(new Layout.HideSpinner());
                    this.layoutService.showSnackbar(err.error.message, null, 2000);
                }
            );
    }
}
