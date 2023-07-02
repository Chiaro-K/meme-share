import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";

@Injectable()
export class AuthGuard {

  constructor(public afAuth: AngularFireAuth, public router: Router) { }

  canActivate() {
    console.log("canActivate");
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        console.log('IS LOGGED IN ALREADY!', user)
        this.router.navigateByUrl('tabs/profile', { replaceUrl: true });
      }
    });
  }
}
