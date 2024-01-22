import { Routes } from '@angular/router';
import {RegisterComponent} from "./components/register/register.component";
import { LoginComponent } from './pages/login/login.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {CreateClassgroupComponent} from "./pages/create-classgroup/create-classgroup.component";

import { HomeComponent } from './pages/home/home.component';
import {CreateModuleComponent} from "./pages/create-module/create-module.component";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'create-module', component: CreateModuleComponent},
  {path: 'classgroup/create-classgroup', component: CreateClassgroupComponent},

];
