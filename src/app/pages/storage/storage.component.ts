import { SharingService } from './../../shared/services/sharing.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Products } from 'src/app/shared/models/Products';
import { ProductsService } from 'src/app/shared/services/products.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css']
})
export class StorageComponent implements OnInit {

  productId: any; 
  products: Array<Products> = [];
  productImages: Array<string> = [];
  filteredProducts: Array<Products> = [];
  filter = { food: true, bathroom: true, cleaning: true };
  loggedInUser?: firebase.default.User | null;
  productObject?: Array<Products>;
  searchText: any;

  constructor(private router: Router,
    private productsService: ProductsService,
    private SharingService: SharingService,
    private authService: AuthService,
    private storage: AngularFireStorage
    ) { }

  ngOnInit(): void {
    this.productsService.loadProducts().subscribe(data =>{
      this.products = data;
      this.filteredProducts = this.products;
      console.log(this.products);

      this.loadProductImages();
    });
    
    this.authService.isUserLoggedIn().subscribe(
      user => {
          this.loggedInUser = user;
    }, 
    (error) => {
      console.error(error);
      }
    );
  }

  loadProductImages() {
    for (const product of this.products) {
      const storageRef = this.storage.ref('images/' + product.image_url);
      storageRef.getDownloadURL().subscribe((url) => {
        // A letöltött URL-eket elmentjük a productImages tömbbe
        this.productImages.push(url);
        console.log(this.productImages);
      });
    }
  }

  getProductsId(product: any){
    this.productId = product.id;
    this.SharingService.setData(this.productId);
    console.log(this.productId);

    const storageRef = this.storage.ref('images/' + product.image_url);
    storageRef.getDownloadURL().subscribe((url) => {
      product.image_url = url;
    });

   this.router.navigateByUrl('/storage-item');
  }

  filterChange() {
    this.filteredProducts = this.products.filter(x => 
       (x.category === 'Élelmiszer' && this.filter.food)
       || (x.category === 'Fürdőszoba' && this.filter.bathroom)
       || (x.category === 'Takarítás' && this.filter.cleaning)
    );
  }
}
