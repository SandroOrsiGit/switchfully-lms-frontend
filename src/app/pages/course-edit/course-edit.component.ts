import { Component, OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { ButtonComponent } from "../../components/button/button.component";
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { CourseService } from "../../services/course.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

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
  name = new FormControl('test', [Validators.required]);
  private formBuilder: FormBuilder = inject(FormBuilder);
  private courseService: CourseService = inject(CourseService);
  private router = inject(Router);
  private _snackBar = inject(MatSnackBar);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private _courseId: number = 0;

  ngOnInit() {
    this.getCourseId();
  }

  onEdit() {
    return this.courseService.editCourse(this._courseId, { name: this.name.value! }).subscribe({
      next: () => {
        this.router.navigate(['/courses']);
      },
      error: () => {
        this._snackBar.open('Only coaches can edit a course', 'Close', {
          duration: 1000
        })
      }
    });
  }

  private getCourseId() {
    this.route.params.subscribe(params => {
      const courseId = params['courseId'];
      this._courseId = courseId;
    });
  }

}
