import { Routes } from '@angular/router';
import {RegisterComponent} from "./components/register/register.component";
import { LoginComponent } from './pages/login/login.component';


export const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent}
];
