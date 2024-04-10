import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
		constructor(
				private _router: Router,
		) { }

		canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const login = localStorage.getItem('login');

        if (login) {
            return true;
        } else {
          this._router.navigate(['/auth/login']);
          return false;
        }
		}
}