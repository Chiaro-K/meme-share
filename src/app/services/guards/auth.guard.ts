import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

import firebase from 'firebase/compat/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return new Promise<boolean>((resolve) => {
      firebase.auth().onAuthStateChanged((user: firebase.User | null) => {
        console.log("user: ", user);
        if (!user) {
          this.router.navigate(['/signup']);
        }
        resolve(true);
      });
    });
  }
}
