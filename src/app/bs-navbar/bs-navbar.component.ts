import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';
import { SharingService } from '../../../src/app/shared/services/sharing.service';
import { User } from '../shared/models/User';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  userId: any; 
  users: Array<User> = [];
  loggedInUser?: firebase.default.User | null;
  userObject?: Array<User>;
  valami: any;


  constructor(private afAuth: AngularFireAuth, 
    public authService: AuthService, 
    public userService: UserService, 
    private router: Router,
    private sharingService: SharingService
    ) { }

  ngOnInit(): void {
    this.userId = this.sharingService.getData();

    this.authService.getAll().subscribe(data =>{
      this.users = data;
    });
    
    this.authService.isUserLoggedIn().subscribe(user => {
      this.loggedInUser = user;
      this.valami = this.loggedInUser?.uid;
      localStorage.setItem('uid', this.loggedInUser?.uid!);
    }, error => {
      console.error(error);
    });
  }

  logout(){
    this.authService.logout();
  }
}
