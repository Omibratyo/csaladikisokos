
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../../app/shared/models/User';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public showPassword: boolean = false;
  firstnameTouched = false;
  lastnameTouched = false;
  registrationAllowed = false;


  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    password: new FormControl('' , Validators.minLength(6)),
    rePassword: new FormControl('', Validators.minLength(6)),
    name: new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required])
    })
  });

  constructor(private location: Location, private authService: AuthService, private userService: UserService, private router: Router) {
    
   }

  ngOnInit(): void {}

  onSubmit() {
    this.authService.signup(this.signUpForm.get('email')?.value, this.signUpForm.get('password')?.value).then(cred => {
      const user: User = {
        id: cred.user?.uid as string,
        email: this.signUpForm.get('email')?.value,
        username: this.signUpForm.get('email')?.value.split('@')[0],
        name: {
          firstname: this.signUpForm.get('name.firstname')?.value,
          lastname: this.signUpForm.get('name.lastname')?.value
        }
      };
      this.userService.create(user).then(_ => {
        this.router.navigateByUrl('');
        console.log('User added successfully.');
      }).catch(error => {
        console.error(error);
      })
    }).catch(error => {
      console.error(error);
    });
  }

  checkNameFields() {
    const firstname = this.signUpForm.get('name.firstname')!.value;
    const lastname = this.signUpForm.get('name.lastname')!.value;
    const email = this.signUpForm.get('email')!.value;
    const password = this.signUpForm.get('password')!.value;
    const rePassword = this.signUpForm.get('rePassword')!.value;
    
    // Az űrlap engedélyezése csak akkor történik meg, ha mindkét mező kitöltve van
    this.registrationAllowed = firstname.length > 0 && lastname.length > 0 && email.length > 0 && password.length > 0 && rePassword.length > 0;
  }

  goBack() {
    this.location.back();
  }

  get password() {
    return this.signUpForm.get('password');
  } 

  get rePassword() {
    return this.signUpForm.get('rePassword');
  } 

  get email() {
    return this.signUpForm.get('email');
  }

  get firstname() {
    return this.signUpForm.get('name.firstname');
  }
  
  get lastname() {
    return this.signUpForm.get('name.lastname');
  }
  

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

}
