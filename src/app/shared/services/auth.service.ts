import { GoogleUser } from './../models/google-user';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { Observable, of, switchMap } from 'rxjs';
import { UserService } from './user.service';
import { authInstanceFactory } from '@angular/fire/auth/auth.module';
import { GoogleAuthProvider, user } from '@angular/fire/auth';
import { AppUser } from '../models/app-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User |null>;

  constructor(
    public afAuth: AngularFireAuth,
    public route: ActivatedRoute,
    public router: Router,
    public userService: UserService,
    public afs: AngularFirestore
  ) { this.user$ = afAuth.authState; }

  login() {
    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }
  AuthLogin(provider: firebase.auth.AuthProvider) {
    return this.afAuth
    .signInWithPopup(provider)
    .then((result) => {
      this.router.navigateByUrl('');
      console.log('You have been successfully logged in!');
    })
    .catch((error) => {
      console.log(error);
    });
  }

  loginnew(email: string, password: string){
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  signup(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  isUserLoggedIn() {
    return this.afAuth.user;
  }

  logout() {
    return this.afAuth.signOut();
  }
}


