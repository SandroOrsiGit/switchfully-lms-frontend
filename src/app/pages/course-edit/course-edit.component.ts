import { Component, OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { ButtonComponent } from "../../components/button/button.component";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { CourseService } from "../../services/course.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import {CourseDto} from "../../dtos/CourseDto";

@Component({
  selector: 'app-course-edit',
  standalone: true,
  imports: [
    MatCardModule,
    ButtonComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './course-edit.component.html',
  styleUrl: './course-edit.component.css'
})
export class CourseEditComponent implements OnInit {

  private courseService: CourseService = inject(CourseService);
  private router = inject(Router);
  private _snackBar = inject(MatSnackBar);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private _course: CourseDto;

  ngOnInit() {
    this.getCourse();
  }

  name: FormControl<string | null> = new FormControl(null, [Validators.required]);

  editCourseForm = new FormGroup( {
    name: this.name,
  });

  onEdit() {
    return this.courseService.editCourse(this._course.id, { name: this.name.value! }).subscribe({
      next: () => {
        this._snackBar.open('Successfully edited course', 'Close', {
          duration: 1000
        });
        this.router.navigate(['/courses']);
      },
      error: () => {
        this._snackBar.open('Only coaches can edit a course', 'Close', {
          duration: 1000
        });
      }
    });
  }

  private getCourse() {
    this.route.params.subscribe(params => {
      const courseId = params['courseId'];

      this.courseService.getCourse(courseId).subscribe({
        next: courseDto => {
          this._course = courseDto;
          this.name.setValue(this._course.name);
        }
      })
    });
  }

}
