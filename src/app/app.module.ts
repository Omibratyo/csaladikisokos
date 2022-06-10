import { SharingService } from './shared/services/sharing.service';
import { ProductsService } from './shared/services/products.service';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore} from '@angular/fire/firestore';
import { provideStorage, getStorage} from '@angular/fire/storage';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AuthService } from './shared/services/auth.service';
import { UserService } from './shared/services/user.service';
import { HomeComponent } from './pages/home/home.component';
import { ShoppingListComponent } from './pages/shopping-list/shopping-list.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { BudgetComponent } from './pages/budget/budget.component';
import { BucketListComponent } from './pages/bucket-list/bucket-list.component';
import { StorageComponent } from './pages/storage/storage.component';
import { StorageItemComponent } from './pages/storage-item/storage-item.component';
import { StorageItemAddComponent } from './pages/storage-item-add/storage-item-add.component';
import { StorageItemUpdateComponent } from './pages/storage-item-update/storage-item-update.component';
import { StorageMissingItemsComponent } from './pages/storage-missing-items/storage-missing-items.component';
import { FoodStorageComponent } from './pages/food-storage/food-storage.component';
import { BathroomStorageComponent } from './pages/bathroom-storage/bathroom-storage.component';
import { CleaningStorageComponent } from './pages/cleaning-storage/cleaning-storage.component';
import { BsSidebarComponent } from './bs-sidebar/bs-sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    ShoppingListComponent,
    RecipesComponent,
    BudgetComponent,
    BucketListComponent,
    StorageComponent,
    StorageItemComponent,
    StorageItemAddComponent,
    StorageItemUpdateComponent,
    StorageMissingItemsComponent,
    FoodStorageComponent,
    BathroomStorageComponent,
    CleaningStorageComponent,
    BsSidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    //provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    NgbModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    AngularFireStorageModule,
    Ng2SearchPipeModule
  ],
  providers: [
    AuthService, 
    UserService,
    ProductsService,
    SharingService
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  exports: [ ReactiveFormsModule ]
})
export class AppModule { }
