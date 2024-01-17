import { Routes } from '@angular/router';
import {RegisterComponent} from "./components/register/register.component";
import {CreateClassgroupComponent} from "./pages/create-classgroup/create-classgroup.component";


export const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'classgroup/create-classgroup', component: CreateClassgroupComponent}
];
