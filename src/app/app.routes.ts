import { Routes } from '@angular/router';
import {RegisterComponent} from "./components/register/register.component";
import { LoginComponent } from './pages/login/login.component';
import { TestpageComponent } from './pages/testPage/testpage.component';

import { HomeComponent } from './pages/home/home/home.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'testpage', component: TestpageComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent}
];
