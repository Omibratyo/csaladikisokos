import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth } from '@angular/fire/auth';
import { Shoppinglist } from '../models/Shoppinglist';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  collectionName = 'Shoppinglist';
  url='';
  userUid: string='';
  

  constructor(
    private afs: AngularFirestore,
  ) { }

  loadShoppinglist(){
    const user = getAuth().currentUser;
      
      if (user) {
        this.userUid = user.uid;
      } else {
      }
    return this.afs.collection<Shoppinglist>(this.collectionName, ref => ref.where('user_id', '==', this.userUid)).valueChanges();
  }

  getProductsById(Id: string) {
    return this.afs.collection<Shoppinglist>(this.collectionName, ref => ref.where('id', '==', Id).orderBy('quantity', 'desc')).valueChanges();
  }

  async update(shoppinglist: Shoppinglist) {
    return this.afs.collection<Shoppinglist>(this.collectionName).doc(shoppinglist.id).update(shoppinglist);
  }

  delete(id: string) {
    return this.afs.collection<Shoppinglist>(this.collectionName).doc(id).delete();
  }

  create(shoppinglist: Shoppinglist) {
    shoppinglist.id = this.afs.createId();
    return this.afs.collection<Shoppinglist>(this.collectionName).doc(shoppinglist.id).set(shoppinglist);
  }
  
}