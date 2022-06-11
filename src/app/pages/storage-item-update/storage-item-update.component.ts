import { ProductsService } from '../../shared/services/products.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { Products } from '../../shared/models/Products';
import { SharingService } from '../../shared/services/sharing.service';

interface Category {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-storage-item-update',
  templateUrl: './storage-item-update.component.html',
  styleUrls: ['./storage-item-update.component.css']
})
export class StorageItemUpdateComponent implements OnInit {

  selectedValue: string | undefined;
  categories: Category[] = [
    {value: 'Élelmiszer', viewValue: 'Élelmiszer'},
    {value: 'Fürdőszoba', viewValue: 'Fürdőszoba'},
    {value: 'Takarítás', viewValue: 'Takarítás'},
  ];

  update = new FormGroup({
    title: new FormControl(''),
    quantity: new FormControl(''),
    category: new FormControl(''),
    description: new FormControl(''),
   
  });

  id: any;
  updateVal: any;
  productsId: any;
  products: Array<Products> = [];
  toUpdate: any;

  constructor(
  private fb: FormBuilder,
  private router: Router,
  private productsService: ProductsService,
  private sharingService: SharingService) {}

 ngOnInit(): void {
  this.productsId = this.sharingService.getData();

  this.productsService.getProductsById(this.productsId).subscribe(data => {
    this.products = data;
    this.toUpdate = this.products[0];
  });
 }

  onSubmit(): void{

  if (this.update.valid) {
    this.productsService.update(this.toUpdate).then(_ => {
      this.router.navigateByUrl('');
    }).catch(error => {
      console.error(error);
    });
  }
 }

}
