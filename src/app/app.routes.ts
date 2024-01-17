import { Routes } from '@angular/router';
import {RegisterComponent} from "./components/register/register.component";
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home/home.component';


export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent}
];
