import { Routes } from '@angular/router';
import {RegisterComponent} from "./pages/register/register.component";
import { LoginComponent } from './pages/login/login.component';
import {ProfileComponent} from './pages/profile/profile.component';

import {CreateModuleComponent} from "./pages/create-module/create-module.component";
import {CreateClassGroupComponent} from "./pages/create-class-group/create-class-group.component";
import {CreateCourseComponent} from "./pages/create-course/create-course.component";
import { CreateCodelabComponent } from './pages/create-codelab/create-codelab.component';
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {coachGuard} from "./guards/coach.guard";
import {authGuard} from "./guards/auth.guard";
import { ClassGroupDetailComponent } from './pages/class-group-detail/class-group-detail.component';
import {CodelabOverviewComponent} from "./pages/codelab-overview/codelab-overview.component";
import {CourseOverviewComponent} from "./pages/course-overview/course-overview.component";
import {ModuleOverviewComponent} from "./pages/module-overview/module-overview.component";
import {StudentDetailComponent} from "./pages/student-detail/student-detail.component";
import { CodelabDetailComponent } from './pages/codelab-detail/codelab-detail.component';
import {CodelabEditComponent} from "./pages/codelab-edit/codelab-edit.component";
import {ClassGroupOverviewComponent} from "./pages/class-group-overview/class-group-overview.component";
import { HomeComponent } from './pages/home/home.component';
import { CourseEditComponent } from './pages/course-edit/course-edit.component';
import {ModuleEditComponent} from "./pages/module-edit/module-edit.component";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [authGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [coachGuard]},

  {path: 'codelabs', component: CodelabOverviewComponent, canActivate: [authGuard]},
  {path: 'codelabs/create', component: CreateCodelabComponent, canActivate: [coachGuard]},
  {path: 'codelabs/:codelabId', component: CodelabDetailComponent, canActivate: [authGuard]},
  {path: 'codelabs/:codelabId/edit', component: CodelabEditComponent},
  {path: 'codelabs/module/:moduleId', component: CodelabOverviewComponent},

  {path: 'modules', component: ModuleOverviewComponent},
  {path: 'modules/create', component: CreateModuleComponent, canActivate: [coachGuard]},
  {path: 'modules/:moduleId/edit', component: ModuleEditComponent, canActivate: [coachGuard]},

  {path: 'courses', component: CourseOverviewComponent, canActivate: [authGuard]},
  {path: 'courses/create', component: CreateCourseComponent, canActivate: [coachGuard]},
  {path: 'courses/:courseId/edit', component: CourseEditComponent, canActivate: [coachGuard]},

  {path: 'class-groups', component: ClassGroupOverviewComponent, canActivate: [authGuard]},
  {path: 'class-groups/create', component: CreateClassGroupComponent, canActivate: [coachGuard]},
  {path: 'class-groups/:id', component: ClassGroupDetailComponent, canActivate: [authGuard]},

  {path: 'student-detail/:id', component: StudentDetailComponent, canActivate: [coachGuard]},
  // {path: 'submodule/create', component: CreateSubModuleComponent},
  { path: '**', redirectTo: '' }
];
