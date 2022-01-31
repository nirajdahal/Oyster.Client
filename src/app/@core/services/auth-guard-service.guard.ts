import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';

import { ToastService } from 'ng-devui';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {


  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService,

  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.authService.isUserAuthenticated()) {

      this.toastService.open({
        value: [
          {
            severity: 'info',
            summary: 'Info',
            content: 'Please login first!'
          }
        ],
        life: 2000,
      });
      this.router.navigate(['login']);
      return false;
    } else {
      return true;
    }
  }
}
