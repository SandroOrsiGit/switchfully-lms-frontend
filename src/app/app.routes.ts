import { Routes } from '@angular/router';
import {RegisterComponent} from "./components/register/register.component";
import { LoginComponent } from './pages/login/login.component';
import { TestpageComponent } from './pages/testPage/testpage.component';

export const routes: Routes = [
  {path: 'testpage', component: TestpageComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent}
];
