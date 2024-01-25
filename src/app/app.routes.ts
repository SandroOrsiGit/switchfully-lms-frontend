import { Routes } from '@angular/router';
import {RegisterComponent} from "./pages/register/register.component";
import { LoginComponent } from './pages/login/login.component';
import {ProfileComponent} from './pages/profile/profile.component';

import { HomeComponent } from './pages/home/home.component';
import {CreateModuleComponent} from "./pages/create-module/create-module.component";
import {CreateClassGroupComponent} from "./pages/create-classgroup/create-class-group.component";
import {CreateCourseComponent} from "./pages/create-course/create-course.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'create-module', component: CreateModuleComponent},
  {path: 'class-group/create-class-group', component: CreateClassGroupComponent},
  {path: 'course/create', component: CreateCourseComponent},
];
