import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Missingproducts } from '../models/Missingproducts';

@Injectable({
  providedIn: 'root'
})
export class MissingProductsService {

  collectionName = 'Missingproducts';

  constructor(
    private afs: AngularFirestore,
  ) { }

  loadMissingproducts() {
    return this.afs.collection<Missingproducts>(this.collectionName).valueChanges();
  }

  getMissingproductsById(Id: string) {
    return this.afs.collection<Missingproducts>(this.collectionName, ref => ref.where('id', '==', Id).orderBy('quantity', 'desc')).valueChanges();
  }
}
