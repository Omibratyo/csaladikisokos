import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatDialogRef } from '@angular/material/dialog';
import { CostsService } from 'src/app/shared/services/costs.service';
import { getAuth } from '@angular/fire/auth';
import { Timestamp } from '@angular/fire/firestore';

interface Category {
  value: string;
  viewValue: string;
}

function nonNegativeNumberValidator(control: FormControl): ValidationErrors | null {
  const value = control.value;
  if (value < 0) {
    return { nonNegativeNumber: true };
  }
  return null;
}

@Component({
  selector: 'app-budget-add',
  templateUrl: './budget-add.component.html',
  styleUrls: ['./budget-add.component.css']
})
export class BudgetAddComponent implements OnInit {

  userUid: string='';

  categories: Category[] = [
    {value: 'Élelmiszer', viewValue: 'Élelmiszer'},
    {value: 'Rezsi', viewValue: 'Rezsi'},
    {value: 'Autó', viewValue: 'Autó'},
    {value: 'Gyógyszerek', viewValue: 'Gyógyszerek'},
    {value: 'Váratlan kiadás', viewValue: 'Váratlan kiadás'},
    {value: 'Szórakozás', viewValue: 'Szórakozás'},
    {value: 'Ház- vagy lakásfelújítás', viewValue: 'Ház- vagy lakásfelújítás'},
    {value: 'Ruházat', viewValue: 'Ruházat'},
    {value: 'TV- és telefon használat', viewValue: 'TV- és telefon használat'},
    {value: 'Hitel törlesztés', viewValue: 'Hitel törlesztés'},
    {value: 'Gyerek', viewValue: 'Gyerek'},
    {value: 'Állattartás', viewValue: 'Állattartás'}
  ];

  createCostsForm = new FormGroup({
    price: new FormControl('', [Validators.required, nonNegativeNumberValidator]),
    category: new FormControl('', [Validators.required]),
    user_id: new FormControl(''),
    date: new FormControl(new Date(), [Validators.required]),
  });

  createVal: any;

  constructor(
    private router: Router,
    private costsService: CostsService,
    private storage: AngularFireStorage,
    public dialogRef: MatDialogRef<BudgetAddComponent> ) {}

    ngOnInit(): void {
      const user = getAuth().currentUser;
      
      if (user) {
        this.userUid = user.uid;
      } else {
      }
      this.createCostsForm.get('user_id')?.setValue(this.userUid);
    }

    onSubmit(): void {
      if (this.createCostsForm.valid) {
        if (this.userUid) {
          this.createCostsForm.get('user_id')?.setValue(this.userUid);
  
          const date = this.createCostsForm.get('date')?.value;
          const timestamp = Timestamp.fromDate(date);
  
          this.createCostsForm.get('date')?.setValue(timestamp);
  
          this.costsService.create(this.createCostsForm.value).then(_ => {
            this.dialogRef.close();
            this.router.navigateByUrl('/budget');
          }).catch(error => {
            console.error(error);
          });
        }
      }
    }
  
  
  get price() { return this.createCostsForm.get('price'); }
  get category() { return this.createCostsForm.get('category'); }

}

