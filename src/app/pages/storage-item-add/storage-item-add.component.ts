import { Observable } from 'rxjs';
import { ProductsService } from '../../shared/services/products.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Products } from 'src/app/shared/models/Products';
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
  imgToUpload: any = {};

  uid: string='';
  imgUploadUrl: string='';
  releaseUploadUrl: string='';

  storagenew = getStorage();

  categories: Category[] = [
    {value: 'Élelmiszer', viewValue: 'Élelmiszer'},
    {value: 'Fürdőszoba', viewValue: 'Fürdőszoba'},
    {value: 'Takarítás', viewValue: 'Takarítás'}
  ];
  units: Unit[] = [
    {value: 'db', viewValue: 'db'},
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
    image_url: new FormControl(''),
    user_id: new FormControl('')
  });

  createVal: any;

  constructor(
    private router: Router,
    private productsService: ProductsService,
    private storage: AngularFireStorage ) {}

  ngOnInit(): void {
    this.valami = (localStorage.getItem('uid'));
  }


 onSubmit(): void{
  if (this.createProductsForm.valid) {
      this.uploadImg().finally(()=>{
        const dto: Products = {
          ...this.createProductsForm.getRawValue() ,
          image_url:this.imgUploadUrl
        }
        console.log(dto);
        this.productsService.create(dto).then(_ => {
          this.router.navigateByUrl('/storage');
        }).catch(error => {
          console.error(error);
        });
      });
    }
    console.log(this.createProductsForm);
  }
  get title() { return this.createProductsForm.get('title'); }
  get quantity() { return this.createProductsForm.get('quantity'); }
  get unit() { return this.createProductsForm.get('unit'); }
  get category() { return this.createProductsForm.get('category'); }
  get description() { return this.createProductsForm.get('description'); } 

  
  uploadImg(): Promise<String> {
    return new Promise((resolve, reject) => {
      const storageRef = ref(
        this.storagenew,
        'images/' + this.uid + '_' + this.imgToUpload.name
      );
      const uploadTask = uploadBytesResumable(storageRef, this.imgToUpload);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          console.log(error.message);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            this.imgUploadUrl = downloadURL;
            resolve(this.imgUploadUrl);
          });
        }
      );
    });
  }

  chooseImgToUpload(event: any) {
    this.imgToUpload = event.target.files[0];
  }

}
