import { Routes } from '@angular/router';
import {RegisterComponent} from "./components/register/register.component";
import { LoginComponent } from './pages/login/login.component';
import {ProfileComponent} from './pages/profile/profile.component';
import { TestpageComponent } from './pages/testPage/testpage.component';

import { HomeComponent } from './pages/home/home/home.component';
import {CreateModuleComponent} from "./pages/create-module/create-module.component";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'testpage', component: TestpageComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'login', component: LoginComponent},
  {path: 'create-module', component: CreateModuleComponent},
];
