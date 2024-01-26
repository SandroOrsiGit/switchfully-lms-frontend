import { Routes } from '@angular/router';
import {RegisterComponent} from "./pages/register/register.component";
import { LoginComponent } from './pages/login/login.component';
import {ProfileComponent} from './pages/profile/profile.component';

import { HomeComponent } from './pages/home/home.component';
import {CreateModuleComponent} from "./pages/create-module/create-module.component";
import {CreateClassGroupComponent} from "./pages/create-classgroup/create-class-group.component";
import {CreateCourseComponent} from "./pages/create-course/create-course.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {coachGuard} from "./guards/coach.guard";
import {authGuard} from "./guards/auth.guard";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [authGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [coachGuard]},
  {path: 'module/create', component: CreateModuleComponent, canActivate: [coachGuard]},
  {path: 'class-group/create', component: CreateClassGroupComponent, canActivate: [coachGuard]},
  {path: 'course/create', component: CreateCourseComponent, canActivate: [coachGuard]},
  // {path: 'submodule/create', component: CreateSubModuleComponent},
  // {path: 'codelab/create', component: CreateCodelabComponent},
];
