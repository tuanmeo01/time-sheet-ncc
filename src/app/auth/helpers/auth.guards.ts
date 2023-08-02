import { Injectable } from "@angular/core";
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
} from "@angular/router";

import { AuthenticationService } from "app/auth/service";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _authenticationService: AuthenticationService
  ) {}

  // canActivate
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this._authenticationService.currentUserValue;

    if (currentUser) {
      console.log(currentUser);
      return true;
    }

    // not logged in so redirect to login page with the return url
    this._router.navigate(["/pages/authentication/login-v2"], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
}
