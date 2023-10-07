import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../../app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public showPassword: boolean = false;
  registrationAllowed = false;

  email = new FormControl('');
  password = new FormControl('');

  loadingSubscription?: Subscription;
  loadingObservation?: Observable<boolean>;

  loading: boolean = false;

  constructor( public authService: AuthService, private afAuth: AngularFireAuth,private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.router.navigateByUrl('');
  }

  async loginnew() {
    this.loading = true;
      this.authService.loginnew(this.email.value, this.password.value).then(cred => {
        console.log(cred);
        this.router.navigateByUrl('');
        this.loading = false;
      }).catch(error => {
        console.error(error);
        this.loading = false;
      });
  }

  ngOnDestroy() {
    this.loadingSubscription?.unsubscribe();
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  checkNameFields() {
    const email = this.email.value;
    const password = this.password.value;
    
    // Az űrlap engedélyezése csak akkor történik meg, ha mindkét mező kitöltve van
    this.registrationAllowed = email.length > 0 && password.length > 0;
  }
  
}
