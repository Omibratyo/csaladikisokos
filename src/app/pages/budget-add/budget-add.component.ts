import { ProductsService } from '../../shared/services/products.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Products } from 'src/app/shared/models/Products';
import { CostsService } from 'src/app/shared/services/costs.service';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

interface Category {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-budget-add',
  templateUrl: './budget-add.component.html',
  styleUrls: ['./budget-add.component.css']
})
export class BudgetAddComponent implements OnInit {

  valami: any;
  uid: string='';

  categories: Category[] = [
    {value: 'Élelmiszer', viewValue: 'Élelmiszer'},
    {value: 'Fürdőszoba', viewValue: 'Fürdőszoba'},
    {value: 'Takarítás', viewValue: 'Takarítás'}
  ];

  createCostsForm = new FormGroup({
    price: new FormControl('',[Validators.required]),
    category: new FormControl('',[Validators.required]),
    user_id: new FormControl('')
  });

  createVal: any;

  constructor(
    private router: Router,
    private costsService: CostsService,
    private storage: AngularFireStorage ) {}

  ngOnInit(): void {
    this.valami = (localStorage.getItem('uid'));
  }


  onSubmit(): void{
    if (this.createCostsForm.valid) {
        this.costsService.create(this.createCostsForm.value).then(_ => {
          this.router.navigateByUrl('/storage');
        }).catch(error => {
          console.error(error);
        });
      }
  }
  
  get price() { return this.createCostsForm.get('price'); }
  get category() { return this.createCostsForm.get('category'); }

}

