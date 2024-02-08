import {Component, inject, OnInit} from '@angular/core';
import {ModuleService} from "../../services/module.service";
import {ModuleDto} from "../../dtos/ModuleDto";
import {AsyncPipe, CommonModule, NgForOf} from '@angular/common';
import {MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";
import {ActivatedRoute, RouterLink} from '@angular/router';
import {ButtonComponent} from "../../components/button/button.component";
import {CourseService} from "../../services/course.service";
import {CourseDto} from "../../dtos/CourseDto";
import {UserService} from "../../services/user.service";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-module-overview',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe,
    MatTableModule,
    MatCardModule,
    ButtonComponent,
    RouterLink,
    CommonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './module-overview.component.html',
  styleUrl: './module-overview.component.css'
})
export class ModuleOverviewComponent implements OnInit {
  private _modules: ModuleDto[] = [];
  private _courseService: CourseService = inject(CourseService);
  private _moduleService: ModuleService = inject(ModuleService);
  private _userService: UserService = inject(UserService);
  private _route: ActivatedRoute = inject(ActivatedRoute);

  private _course: CourseDto;
  loading: boolean = true;

  displayedColumns: string[] = ['name', 'actions'];
  btn_create_module: string = "Create Module";
  btn_module_details: string = "Details";
  btn_edit_module: string = "Edit";
  btn_add_codelab: string = "Add Codelab";

  ngOnInit() {
    if(this._route.snapshot.queryParamMap.get('courseId') !== null) {
      const courseId = parseInt(this._route.snapshot.queryParamMap.get('courseId')!);

      this._courseService.getCourse(courseId).subscribe({
        next: course => {
          this._course = course;
          this.getModules();
        }
      })
    }
  }

  private getModules() {
    this._moduleService.getModules(this._course.id).subscribe(
      {
        next: modules => {
          this._modules = modules
          this.finishLoading();
        },
      }
    );
  }

  get course(): CourseDto {
    return this._course;
  }

  get modules(): ModuleDto[] {
    return this._modules;
  }

  isCoach() {
    return this._userService.isCoach();
  }

  finishLoading() {
    this.loading = false;
  }

}
