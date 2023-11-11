import { SharingService } from './../../shared/services/sharing.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MissingProductsService } from 'src/app/shared/services/missing-products.service';
import { Missingproducts } from 'src/app/shared/models/Missingproducts';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-storage-missing-items',
  templateUrl: './storage-missing-items.component.html',
  styleUrls: ['./storage-missing-items.component.css']
})
export class StorageMissingItemsComponent implements OnInit {

  productId: any; 
  missingproducts: Array<Missingproducts> = [];
  missingproductImages: Array<string> = [];

  constructor(private router: Router,
    private missingproductsService: MissingProductsService,
    private SharingService: SharingService,
    private storage: AngularFireStorage
    ) { }

  ngOnInit(): void {
    this.missingproductsService.loadMissingproducts().subscribe(data =>{
      this.missingproducts = data;
      console.log(this.missingproducts);

      this.loadProductImages();
    });
  }

  loadProductImages() {
    for (const missingproduct of this.missingproducts) {
      const storageRef = this.storage.ref('missingproducts/' + missingproduct.image_url);
      storageRef.getDownloadURL().subscribe((url) => {
        this.missingproductImages.push(url);
      });
    }
  }

  getProductsId(missingproduct: any){
    this.productId = missingproduct.image_url.id;
    this.SharingService.setData(this.productId);

    const storageRef = this.storage.ref('missingproducts/' + missingproduct.image_url);
    storageRef.getDownloadURL().subscribe((url) => {
      missingproduct.image_url = url;
    });

   this.router.navigateByUrl('/storage-item');
  }
}

