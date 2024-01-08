import { Injectable, NgZone } from '@angular/core';

import { User } from '../../models/User';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import {
  Firestore,
  doc,
  docData,
} from '@angular/fire/firestore';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  userData: any; // Save logged in user data

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning) { }
    private auth: Auth,
    private firestore: Firestore

  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        console.log('FIREBASE USER', user);

        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }
  
  getUserProfile() {
    const user = this.auth.currentUser;
    const userDocRef = doc(this.firestore, `users/${user!.uid}`);
    return docData(userDocRef, { idField: 'id' });
  }

  SignIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password).then((result) => {
      this.SetUserData(result.user);
      this.afAuth.authState.subscribe((user) => {
        if (user) {
          console.log('USER: ', user);
          this.router.navigateByUrl('tabs/profile', { replaceUrl: true });
        }
      });
    })
      .catch((error) => {
        switch (error['code']) {
          case 'auth/user-not-found':
            return 'User not found!';
          case 'auth/invalid-email':
            return 'Email not formated correctly!';
          default:
            return 'There a problem logging you in.';
        }
      });
  }

  SignUp(email: string, password: string) {
    console.log("signing up!")
    return this.afAuth.createUserWithEmailAndPassword(email, password).then((result) => {
      this.SetUserData(result.user);
      this.afAuth.authState.subscribe((user) => {
        if (user) {
          console.log('USER: ', user);
          this.router.navigate(['tabs/profile']);
        }
      });
    })
  }

  logout() {
    return this.afAuth.signOut();
  }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
}
