import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'pages/login' , component: LoginComponent},
  { path: 'signup' , component: SignupComponent},
  { path: 'bs-navbar' , component: BsNavbarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
