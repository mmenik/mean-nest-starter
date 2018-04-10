import { CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, Route } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { take } from 'rxjs/operators';

import * as fromRoot from '../app.reducer';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

    constructor(private readonly store: Store<fromRoot.State>) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        console.log('canActivate');
        return this.store.select(fromRoot.getIsAuthenticated).pipe(take(1));
    }

    canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
        console.log('canLoad');
        return this.store.select(fromRoot.getIsAuthenticated).pipe(take(1));
    }
}
