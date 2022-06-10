import { AngularFireDatabase } from '@angular/fire/compat/database';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Products } from '../models/Products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  collectionName = 'Products';
  url='';

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) { }

  loadProducts(){
    return this.afs.collection<Products>(this.collectionName).valueChanges();
  }

  getProductsById(Id: string) {
    return this.afs.collection<Products>(this.collectionName, ref => ref.where('id', '==', Id).orderBy('price', 'desc')).valueChanges();
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

