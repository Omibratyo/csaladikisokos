import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User |null>;

  constructor(
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public route: ActivatedRoute,
    public router: Router,
    public userService: UserService
  ) { this.user$ = afAuth.authState; }

  login() {
    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
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


