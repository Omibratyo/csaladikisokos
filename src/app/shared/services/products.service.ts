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

  // updateImage függvény: A felhasználóhoz tartozó kép URL beállítása a Firebase Realtime Database-ben.
  updateImage(user_id: string, imageObject: { image_url: string }) {
    // Meghatározza az adatbázis csomópont elérési útvonalát, ahol a kép URL-t el kell menteni.
    const path = `path_to_database_node/${user_id}/image_url`;
    // Az `imageObject` segítségével beállítja a kép URL értékét az adatbázisban a meghatározott útvonalon.
    // Ez a függvény az adatbázisban létrehozza vagy frissíti a `user_id`-hoz tartozó kép URL értékét.
    return this.db.object(path).set(imageObject);
  }
}

