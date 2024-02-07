import {Component, inject, OnInit} from '@angular/core';
import {CourseDto} from "../../dtos/CourseDto";
import {CourseService} from "../../services/course.service";
import {MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../components/button/button.component';
import {NgIf} from "@angular/common";
import {UserService} from "../../services/user.service";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-course-overview',
  standalone: true,
  imports: [
    MatTableModule,
    MatCardModule,
    RouterLink,
    ButtonComponent,
    NgIf,
    MatProgressSpinnerModule
  ],
  templateUrl: './course-overview.component.html',
  styleUrl: './course-overview.component.css'
})
export class CourseOverviewComponent implements OnInit {
  private _courses: CourseDto[] = [];
  private _courseService: CourseService = inject(CourseService);
  private _userService: UserService = inject(UserService);

  loading: boolean = true;

  displayedColumns: string[] = ['name', 'actions'];
  btn_create_course: string = "Create Course";
  btn_course_details: string = "Details";
  btn_edit_course: string = "Edit";
  btn_add_module: string = "Add Module";

  ngOnInit() {
    this.getCourses();
  }

  private getCourses() {
    this._courseService.getCourses().subscribe(
      {
        next: courses => {
          this._courses = courses
          this.finishLoading();
        }
      }
    );
  }

  get courses(): CourseDto[] {
    return this._courses;
  }

  isCoach() {
    return this._userService.isCoach();
  }

  finishLoading() {
    this.loading = false;
  }
}
