import { Observable } from 'rxjs';
import { ProductsService } from '../../shared/services/products.service';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

interface Category {
  value: string;
  viewValue: string;
}
interface Quantity {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-storage-item-add',
  templateUrl: './storage-item-add.component.html',
  styleUrls: ['./storage-item-add.component.css']
})
export class StorageItemAddComponent {

  categories: Category[] = [
    {value: 'Élelmiszer', viewValue: 'Élelmiszer'},
    {value: 'Fürdőszoba', viewValue: 'Fürdőszoba'},
    {value: 'Takarítás', viewValue: 'Takarítás'}
  ];
  quantities: Quantity[] = [
    {value: 'mm', viewValue: 'mm'},
    {value: 'cm', viewValue: 'cm'},
    {value: 'dm', viewValue: 'dm'},
    {value: 'm', viewValue: 'm'},
    {value: 'km', viewValue: 'km'},
    {value: 'ml', viewValue: 'ml'},
    {value: 'cl', viewValue: 'cl'},
    {value: 'dl', viewValue: 'dl'},
    {value: 'l', viewValue: 'l'},
    {value: 'mg', viewValue: 'mg'},
    {value: 'g', viewValue: 'g'},
    {value: 'dkg', viewValue: 'dkg'},
    {value: 'kg', viewValue: 'kg'}
  ];

  createProductsForm = new FormGroup({
    title: new FormControl(''),
    quantity: new FormControl(''),
    category: new FormControl(''),
    description: new FormControl(''),
  });

  createVal: any;

  constructor(
    private router: Router,
    private productsService: ProductsService ) {}

 onSubmit(): void{
  if (this.createProductsForm.valid) {
      this.productsService.create(this.createProductsForm.value).then(_ => {
        this.router.navigateByUrl('');
      }).catch(error => {
        console.error(error);
      });
    }
  }
}
