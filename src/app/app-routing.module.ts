import { BsSidebarComponent } from './bs-sidebar/bs-sidebar.component';
import { CleaningStorageComponent } from './pages/cleaning-storage/cleaning-storage.component';
import { BathroomStorageComponent } from './pages/bathroom-storage/bathroom-storage.component';
import { FoodStorageComponent } from './pages/food-storage/food-storage.component';
import { StorageMissingItemsComponent } from './pages/storage-missing-items/storage-missing-items.component';
import { StorageItemUpdateComponent } from './pages/storage-item-update/storage-item-update.component';
import { StorageItemAddComponent } from './pages/storage-item-add/storage-item-add.component';
import { StorageItemComponent } from './pages/storage-item/storage-item.component';
import { StorageComponent } from './pages/storage/storage.component';
import { ShoppingListComponent } from './pages/shopping-list/shopping-list.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { BudgetComponent } from './pages/budget/budget.component';
import { BucketListComponent } from './pages/bucket-list/bucket-list.component';
import { HomeComponent } from './pages/home/home.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './shared/services/auth-guard.service';

const routes: Routes = [
  { path: '' , component: HomeComponent},
  { path: 'login' , component: LoginComponent},
  { path: 'signup' , component: SignupComponent},
  { path: 'bs-navbar' , component: BsNavbarComponent},
  { path: 'bs-sidebar' , component: BsSidebarComponent},
  { path: 'bucket-list' , component: BucketListComponent, canActivate: [AuthGuardService]},
  { path: 'budget' , component: BudgetComponent, canActivate: [AuthGuardService]},
  { path: 'recipes' , component: RecipesComponent, canActivate: [AuthGuardService]},
  { path: 'shopping-list' , component: ShoppingListComponent, canActivate: [AuthGuardService]},
  { path: 'storage' , component: StorageComponent, canActivate: [AuthGuardService]},
  { path: 'storage-item' , component: StorageItemComponent, canActivate: [AuthGuardService]},
  { path: 'storage-item-add' , component: StorageItemAddComponent, canActivate: [AuthGuardService]},
  { path: 'storage-item-update' , component: StorageItemUpdateComponent, canActivate: [AuthGuardService]},
  { path: 'storage-missing-items' , component: StorageMissingItemsComponent, canActivate: [AuthGuardService]},
  { path: 'food-storage' , component: FoodStorageComponent},
  { path: 'bathroom-storage' , component: BathroomStorageComponent},
  { path: 'cleaning-storage' , component: CleaningStorageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
