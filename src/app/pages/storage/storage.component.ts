import { SharingService } from './../../shared/services/sharing.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Products } from 'src/app/shared/models/Products';
import { ProductsService } from 'src/app/shared/services/products.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css']
})
export class StorageComponent implements OnInit {

  checkboxArray:any = [
    {
      id:1,
      type: "checkbox",
      category: "Minden"
    },
    {
      id:2,
      type: "checkbox",
      category: "Élelmiszer"
    },
    {
      id:3,
      type: "checkbox",
      category: "Fürdőszoba"
    },
    {
      id:4,
      type: "checkbox",
      category: "Takarítás"
    }
  ]

  productId: any; 
  products: Array<Products> = [];
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
  
}
