import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../../app/shared/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../error-dialog/error-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public showPassword: boolean = false;
  registrationAllowed = false;

  email = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
  ]);
  password = new FormControl('');

  loadingSubscription?: Subscription;
  loadingObservation?: Observable<boolean>;

  loading: boolean = false;

  constructor(
    public authService: AuthService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  login() {
    this.router.navigateByUrl('');
  }

  async loginnew() {
    this.loading = true;

    try {
      const cred = await this.authService.loginnew(
        this.email.value,
        this.password.value
      );
      if (await this.authService.isEmailVerified()) {
        this.router.navigateByUrl('');
      } else {
        this.openErrorDialog(
          'Az e-mail-cím még nincsen megerősítve, a belépéshez először erősítsd meg az e-mail-címed.'
        );
      }
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.openErrorDialog('Hibás felhasználónév vagy jelszó!');
    }
  }

  openErrorDialog(message: string): void {
    this.dialog.open(ErrorDialogComponent, {
      width: '300px',
      data: { message },
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

    this.registrationAllowed = email.length > 0 && password.length > 0;
  }
}
