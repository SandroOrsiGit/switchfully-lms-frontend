import {Component, inject, OnInit} from '@angular/core';
import {CourseDto} from "../../dtos/CourseDto";
import {CourseService} from "../../services/course.service";
import {MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";

@Component({
  selector: 'app-course-overview',
  standalone: true,
  imports: [
    MatTableModule,
    MatCardModule
  ],
  templateUrl: './course-overview.component.html',
  styleUrl: './course-overview.component.css'
})
export class CourseOverviewComponent implements OnInit {
  private _courses: CourseDto[] = [];
  private _courseService: CourseService = inject(CourseService);
  displayedColumns: string[] = ['id', 'name'];

  ngOnInit() {
    this.getCourses();
  }

  private getCourses() {
    this._courseService.getCourses().subscribe({
      next: courses => this._courses = courses
    });
  }

  get courses(): CourseDto[] {
    return this._courses;
  }
}
