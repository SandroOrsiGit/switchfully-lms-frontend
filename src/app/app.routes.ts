import { Routes } from '@angular/router';
import {CreateClassgroupComponent} from "./pages/create-classgroup/create-classgroup.component";
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  {path: 'create-classgroup', component: CreateClassgroupComponent},
  {path: 'login', component: LoginComponent},
];
