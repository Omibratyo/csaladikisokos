import { SharingService } from './../../shared/services/sharing.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Products } from 'src/app/shared/models/Products';
import { ProductsService } from 'src/app/shared/services/products.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css']
})
export class StorageComponent implements OnInit {

  productId: any; 
  products: Array<Products> = [];
  filteredProducts: Array<Products> = [];
  filter = { food: true, bathroom: true, cleaning: true };
  loggedInUser?: firebase.default.User | null;
  productObject?: Array<Products>;

  constructor(private router: Router,
    private productsService: ProductsService,
    private SharingService: SharingService,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.productsService.loadProducts().subscribe(data =>{
      this.products = data;
      this.filteredProducts = this.products;
      console.log(this.products);
    });
    
    this.authService.isUserLoggedIn().subscribe(user => {
      this.loggedInUser = user;
    }, error => {
      console.error(error);
    });
  }

  getProductsId(product: any){
    this.productId = product.id;
    this.SharingService.setData(this.productId);
    console.log(this.productId);

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
