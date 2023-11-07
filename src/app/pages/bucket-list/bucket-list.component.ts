import { SharingService } from './../../shared/services/sharing.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Bucketlist } from 'src/app/shared/models/Bucketlist';
import { BucketListService } from 'src/app/shared/services/bucket-list.service';

@Component({
  selector: 'app-bucket-list',
  templateUrl: './bucket-list.component.html',
  styleUrls: ['./bucket-list.component.css']
})
export class BucketListComponent implements OnInit {

  bucketlist: Array<Bucketlist> = [];
  loggedInUser?: firebase.default.User | null;;

  constructor(private router: Router,
    private bucketlistService: BucketListService,
    private SharingService: SharingService,
    private authService: AuthService,
    private storage: AngularFireStorage
    ) { }

  ngOnInit(): void {
    this.bucketlistService.loadBucketlist().subscribe(data =>{
      this.bucketlist = data;
    });
    
    this.authService.isUserLoggedIn().subscribe(
      user => {
          this.loggedInUser = user;
    }, 
    (error) => {
      console.error(error);
      }
    );
  }
}

