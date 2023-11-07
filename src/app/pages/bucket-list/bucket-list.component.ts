import { SharingService } from './../../shared/services/sharing.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Bucketlist } from 'src/app/shared/models/Bucketlist';
import { BucketListService } from 'src/app/shared/services/bucket-list.service';
import { getAuth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-bucket-list',
  templateUrl: './bucket-list.component.html',
  styleUrls: ['./bucket-list.component.css'],
})
export class BucketListComponent implements OnInit {
  bucketlist: Array<Bucketlist> = [];
  loggedInUser?: firebase.default.User | null;
  userUid: string = '';

  createBucketlistForm = new FormGroup({
    name: new FormControl(''),
    user_id: new FormControl(''),
  });

  checkedItems: Set<number> = new Set<number>();

  constructor(
    private router: Router,
    private bucketlistService: BucketListService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.bucketlistService.loadBucketlist().subscribe((data) => {
      this.bucketlist = data;
      const user = getAuth().currentUser;

      this.authService.isUserLoggedIn().subscribe(
        (user) => {
          this.loggedInUser = user;
          if (user) {
            this.userUid = user.uid;
          }
        },
        (error) => {
          console.error(error);
        }
      );
    });

    this.authService.isUserLoggedIn().subscribe(
      (user) => {
        this.loggedInUser = user;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onSubmit(): void {
    if (this.createBucketlistForm.valid) {
      if (this.userUid) {
        this.createBucketlistForm.get('user_id')?.setValue(this.userUid);
  
        this.bucketlistService.create(this.createBucketlistForm.value).then(() => {
          this.createBucketlistForm.get('name')?.reset();
        }).catch(error => {
          console.error(error);
        });
      }
    }
  }
  

  toggleCheckbox(index: number): void {
    if (this.checkedItems.has(index)) {
      this.checkedItems.delete(index);
    } else {
      this.checkedItems.add(index);
    }
  }

  async delete(id: string, index: number) {
    this.bucketlistService
      .delete(id)
      .then(() => {
        this.checkedItems.delete(index);
      })
      .catch((error) => {});
  }

  shouldCrossOut(index: number): boolean {
    return this.checkedItems.has(index);
  }
  
}
