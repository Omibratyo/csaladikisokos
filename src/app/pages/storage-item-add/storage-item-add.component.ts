import { Observable } from 'rxjs';
import { ProductsService } from '../../shared/services/products.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

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
  selectedFile: File | null = null;

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
  get image_url() { return this.createProductsForm.get('image_url'); } 


  // uploadFile függvény: A kiválasztott kép feltöltése a Firebase Storage-ba és a kép URL-jének mentése a Realtime Database-be.
  async uploadFile(): Promise<string | null> {
    if (this.selectedFile) {
      // Meghatározza a fájl elérési útvonalát a Firebase Storage-ban, beleértve a fájl nevét.
      const filePath = `images/${this.valami}/${this.selectedFile.name}`;
       // Létrehoz egy referenciát a Firebase Storage-ban a megadott útvonalhoz.
      const fileRef = this.storage.ref(filePath);
       // Feltölti a kiválasztott fájlt a Firebase Storage-ba.
      const task = this.storage.upload(filePath, this.selectedFile);

      // Várjon a feltöltés befejezésére
      await task.snapshotChanges()
        .pipe(
          finalize(async () => {
            // Lekéri a feltöltött kép letölthető URL-jét.
            const downloadURL = await fileRef.getDownloadURL().toPromise();
            // Létrehoz egy objektumot a kép URL-jével.
            const imageObject = { image_url: downloadURL };
            // Mentse el a kép URL-jét a Realtime Database-be a felhasználóhoz.
            this.productsService.updateImage(this.valami, imageObject);
          })
        )
        .toPromise();

      return filePath;
    } else {
      return null;
    }
  }

  // onFileSelected függvény: A kiválasztott fájl beállítása az űrlapon.
  onFileSelected(event: any) {
     // Beállítja a kiválasztott fájlt a selectedFile változóba.
    this.selectedFile = event.target.files[0];
  
    if (this.selectedFile) {
       // Beállítja az űrlapban található image_url vezérlő értékét a kiválasztott fájl nevére.
      // Ezt a nevet látja majd a felhasználó az űrlapon.
      this.createProductsForm.get('image_url')?.setValue(this.selectedFile.name);
    } else {
       // Törli az image_url vezérlő tartalmát, ha nincs kiválasztott fájl.
      this.createProductsForm.get('image_url')?.setValue('');
    }
  }
  
   

}
