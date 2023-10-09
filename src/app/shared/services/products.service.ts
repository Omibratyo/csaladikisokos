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

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  collectionName = 'Products';
  url='';
  valami: any;
  

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
    private sharingService: SharingService,
    private authService: AuthService
  ) { }

  loadProducts(){
    this.valami = (localStorage.getItem('uid'));
    //return this.afs.collection<Products>(this.collectionName).valueChanges();
    return this.afs.collection<Products>(this.collectionName, ref => ref.where('user_id', '==', this.valami)).valueChanges();
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

  /**loadImageMeta(metaUrl: string): Observable<Array<Products>> {
    return this.afs.collection<Products>(this.collectionName).valueChanges();
  }

  loadImage(imageUrl: string) {
    return this.storage.ref(imageUrl).getDownloadURL();
  }*/
}

