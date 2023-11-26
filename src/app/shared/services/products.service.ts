import { AuthService } from 'src/app/shared/services/auth.service';
import { SharingService } from './sharing.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Products } from '../models/Products';
import { User } from '../models/User';
import { getAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  collectionName = 'Products';
  url='';
  userUid: string='';

  constructor(
    private afs: AngularFirestore,
    private db: AngularFireDatabase
  ) { }

  loadProducts(){
    const user = getAuth().currentUser;
      
      if (user) {
        this.userUid = user.uid;
      } else {
      }
    return this.afs.collection<Products>(this.collectionName, ref => ref.where('user_id', '==', this.userUid)).valueChanges();
  }

  getProductsById(Id: string) {
    return this.afs.collection<Products>(this.collectionName, ref => ref.where('id', '==', Id).orderBy('quantity', 'desc')).valueChanges();
  }

  async update(products: Products) {
    return this.afs.collection<Products>(this.collectionName).doc(products.id).update(products);
  }

  delete(id: string) {
    return this.afs.collection<Products>(this.collectionName).doc(id).delete();
  }

  create(products: Products) {
    products.id = this.afs.createId();
    return this.afs.collection<Products>(this.collectionName).doc(products.id).set(products);
  }
}

