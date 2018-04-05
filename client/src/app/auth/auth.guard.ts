import { CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, Route } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

    // constructor(private store: Store<fromRoot.State>) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        console.log('guard activate');
        // return this.store.select(fromRoot.getIsAuthenticated).pipe(take(1));
        return true;
    }

    canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
        console.log('guard load');
        // return this.store.select(fromRoot.getIsAuthenticated).pipe(take(1));
        return true;
    }
}
