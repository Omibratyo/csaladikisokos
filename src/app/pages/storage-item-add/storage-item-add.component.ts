import { Observable } from 'rxjs';
import { ProductsService } from '../../shared/services/products.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

interface Category {
  value: string;
  viewValue: string;
}
interface Unit {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-storage-item-add',
  templateUrl: './storage-item-add.component.html',
  styleUrls: ['./storage-item-add.component.css']
})
export class StorageItemAddComponent implements OnInit {

  valami: any;

  categories: Category[] = [
    {value: 'Élelmiszer', viewValue: 'Élelmiszer'},
    {value: 'Fürdőszoba', viewValue: 'Fürdőszoba'},
    {value: 'Takarítás', viewValue: 'Takarítás'}
  ];
  units: Unit[] = [
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
    title: new FormControl('',[Validators.required]),
    quantity: new FormControl('',[Validators.required]),
    unit: new FormControl('',[Validators.required]),
    category: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
    user_id: new FormControl('')
  });

  createVal: any;

  constructor(
    private router: Router,
    private productsService: ProductsService ) {}

  ngOnInit(): void {
    this.valami = (localStorage.getItem('uid'));
  }

 onSubmit(): void{
  if (this.createProductsForm.valid) {
      this.productsService.create(this.createProductsForm.value).then(_ => {
        this.router.navigateByUrl('/storage');
      }).catch(error => {
        console.error(error);
      });
    }
    console.log(this.createProductsForm);
  }
  get title() { return this.createProductsForm.get('title'); }
  get quantity() { return this.createProductsForm.get('quantity'); }
  get unit() { return this.createProductsForm.get('unit'); }
  get category() { return this.createProductsForm.get('category'); }
  get description() { return this.createProductsForm.get('description'); }
}
