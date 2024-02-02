import { Routes } from '@angular/router';
import {RegisterComponent} from "./pages/register/register.component";
import { LoginComponent } from './pages/login/login.component';
import {ProfileComponent} from './pages/profile/profile.component';

import {CreateModuleComponent} from "./pages/create-module/create-module.component";
import {CreateClassGroupComponent} from "./pages/create-classgroup/create-class-group.component";
import {CreateCourseComponent} from "./pages/create-course/create-course.component";
import { CreateCodelabComponent } from './pages/create-codelab/create-codelab.component';
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {coachGuard} from "./guards/coach.guard";
import {authGuard} from "./guards/auth.guard";
import { ClassgroupOverviewComponent } from './pages/classgroup-overview/classgroup-overview.component';
import {CodelabOverviewComponent} from "./pages/codelab-overview/codelab-overview.component";
import {CourseOverviewComponent} from "./pages/course-overview/course-overview.component";
import {ModuleOverviewComponent} from "./pages/module-overview/module-overview.component";
import {StudentOverviewComponent} from "./pages/student-overview/student-overview.component";
import { CodelabDetailComponent } from './pages/codelab-detail/codelab-detail.component';
import {UpdateCodelabComponent} from "./pages/update-codelab/update-codelab.component";
import { HomeComponent } from './pages/home/home.component';
import { CourseEditComponent } from './pages/course-edit/course-edit.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [authGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'codelabs/create', component: CreateCodelabComponent, canActivate: [coachGuard]},
  {path: 'codelabs', component: CodelabOverviewComponent, canActivate: [authGuard]},
  {path: 'codelabs/:codelabId', component: CodelabDetailComponent, canActivate: [authGuard]},
  {path: 'modules/create', component: CreateModuleComponent, canActivate: [coachGuard]},
  {path: 'courses', component: CourseOverviewComponent, canActivate: [authGuard]},
  {path: 'courses/create', component: CreateCourseComponent, canActivate: [coachGuard]},
  {path: 'courses/:courseId/edit', component: CourseEditComponent, canActivate: [coachGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [coachGuard]},
  {path: 'class-groups/create', component: CreateClassGroupComponent, canActivate: [coachGuard]},
  {path: 'class-groups/overview/:id', component: ClassgroupOverviewComponent, canActivate: [authGuard]},
  {path: 'modules/:courseId', component: ModuleOverviewComponent},
  {path: 'codelab/update/:codelabId', component: UpdateCodelabComponent},
  {path: 'student-overview/:id', component: StudentOverviewComponent},
  // {path: 'submodule/create', component: CreateSubModuleComponent},
];
