import { AuthService } from 'src/app/shared/services/auth.service';
import { SharingService } from './sharing.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Costs } from '../models/Costs';
import { getAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class CostsService {

  collectionName = 'Costs';
  url='';
  userUid: string='';
  

  constructor(
    private afs: AngularFirestore,
    private db: AngularFireDatabase
  ) { }

  loadCosts(){
    const user = getAuth().currentUser;
      
      if (user) {
        this.userUid = user.uid;
      } else {
      }
    return this.afs.collection<Costs>(this.collectionName, ref => ref.where('user_id', '==', this.userUid)).valueChanges();
  }

  getProductsById(Id: string) {
    return this.afs.collection<Costs>(this.collectionName, ref => ref.where('id', '==', Id).orderBy('quantity', 'desc')).valueChanges();
  }

  async update(costs: Costs) {
    return this.afs.collection<Costs>(this.collectionName).doc(costs.id).update(costs);
  }

  delete(id: string) {
    return this.afs.collection<Costs>(this.collectionName).doc(id).delete();
  }

  create(costs: Costs) {
    costs.id = this.afs.createId();
    return this.afs.collection<Costs>(this.collectionName).doc(costs.id).set(costs);
  }
  
}


