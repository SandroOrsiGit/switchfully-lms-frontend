import { Routes } from '@angular/router';
import {RegisterComponent} from "./components/register/register.component";
import { LoginComponent } from './pages/login/login.component';
import {ProfileComponent} from './pages/profile/profile.component';
import { TestpageComponent } from './pages/testPage/testpage.component';

import { HomeComponent } from './pages/home/home/home.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'testpage', component: TestpageComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent}
];
