import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Bucketlist } from '../models/Bucketlist';
import { getAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class BucketListService {

  collectionName = 'Bucketlist';
  url='';
  userUid: string='';

  constructor(
    private afs: AngularFirestore
  ) { }

  loadBucketlist(){
    const user = getAuth().currentUser;
      
      if (user) {
        this.userUid = user.uid;
      } else {
      }
    return this.afs.collection<Bucketlist>(this.collectionName, ref => ref.where('user_id', '==', this.userUid)).valueChanges();
  }

  getBucketListById(Id: string) {
    return this.afs.collection<Bucketlist>(this.collectionName, ref => ref.where('id', '==', Id).orderBy('quantity', 'desc')).valueChanges();
  }

  async update(bucketlist: Bucketlist) {
    return this.afs.collection<Bucketlist>(this.collectionName).doc(bucketlist.id).update(bucketlist);
  }

  delete(id: string) {
    return this.afs.collection<Bucketlist>(this.collectionName).doc(id).delete();
  }

  create(bucketlist: Bucketlist) {
    bucketlist.id = this.afs.createId();
    return this.afs.collection<Bucketlist>(this.collectionName).doc(bucketlist.id).set(bucketlist);
  }
}


