import {Component, inject, OnInit} from '@angular/core';
import {CourseDto} from "../../dtos/CourseDto";
import {CourseService} from "../../services/course.service";
import {MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../components/button/button.component';
import {NgIf} from "@angular/common";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-course-overview',
  standalone: true,
    imports: [
        MatTableModule,
        MatCardModule,
        RouterLink,
        ButtonComponent,
        NgIf
    ],
  templateUrl: './course-overview.component.html',
  styleUrl: './course-overview.component.css'
})
export class CourseOverviewComponent implements OnInit {
  private _courses: CourseDto[] = [];
  private _courseService: CourseService = inject(CourseService);
  private _userService: UserService = inject(UserService);
  displayedColumns: string[] = ['id', 'name', 'details', 'create_module'];
  btn_create_course: string = "Create Course";
  btn_create_module: string = "Create Module";
  btn_edit_course: string = "Edit Course";

  ngOnInit() {
    this.getCourses();
  }

  private getCourses() {
    this._courseService.getCourses().subscribe(
      {
        next: courses => this._courses = courses
      }
    );
  }

  get courses(): CourseDto[] {
    return this._courses;
  }

  isCoach() {
    return this._userService.getCurrentUser()?.role === 'coach';
  }

}
