import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatDialogRef } from '@angular/material/dialog';
import { CostsService } from 'src/app/shared/services/costs.service';
import { getAuth } from '@angular/fire/auth';

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

  userUid: string='';

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
    
          this.costsService.create(this.createCostsForm.value).then(_ => {
            this.dialogRef.close();
            this.router.navigateByUrl('/budget');
          }).catch(error => {
            console.error(error);
          });
        } else {
        }
      }
    }
  
  get price() { return this.createCostsForm.get('price'); }
  get category() { return this.createCostsForm.get('category'); }

}

