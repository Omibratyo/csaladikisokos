import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';
import { SharingService } from '../../../src/app/shared/services/sharing.service';
import { User } from '../shared/models/User';
import { filter, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  userId: any; 
  users: Array<User> = [];
  loggedInUser?: User[] = [];
  userObject?: Array<User>;
  valami: any;
  userUid?: string;


  constructor(private afAuth: AngularFireAuth, 
    public authService: AuthService, 
    public userService: UserService, 
    private router: Router,
    private sharingService: SharingService,
    private location: Location
    ) { }

    ngOnInit(): void {
      this.userId = this.sharingService.getData();
    
      this.authService.CurrentUser()
      .pipe(
          filter(data => !!data && !!data.uid),
          switchMap(data => {
              this.userUid = data!.uid;
              return this.authService.getUserById(this.userUid);
          })
      )
      .subscribe(user => {
        this.loggedInUser = user;
      });  
    }
  
    logout(){
      this.router.navigate(['/']);
      this.authService.logout();
      window.location.reload();
    }
}
