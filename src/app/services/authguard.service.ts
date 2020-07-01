import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { User } from '../models';
import { map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    currentUser: User;
    constructor(private router: Router, private authService: AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

        return this.authService.currentUser.pipe(
            map(x => {
                this.currentUser = x;
                if (this.currentUser) {
                  return true;
                } else {
                   // not logged in so redirect to login page with the return url and return false
                   this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
                   return false;
                }
            }),
            catchError(err =>  of(false))
        );

    }
}
