import {Component, inject} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {ButtonComponent} from "../../components/button/button.component";
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {CourseService} from "../../services/course.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-create-course',
  standalone: true,
  imports: [
    MatCardModule,
    ButtonComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-course.component.html',
  styleUrl: './create-course.component.css'
})
export class CreateCourseComponent {
  name = new FormControl('test', [Validators.required]);
  private formBuilder: FormBuilder = inject(FormBuilder);
  private courseService: CourseService = inject(CourseService);
  private router = inject(Router);
  private _snackBar = inject(MatSnackBar);

  onCreate() {
    return this.courseService.createCourse({name: this.name.value!}).subscribe({
      next: () => {
        this.router.navigate(['/profile']);
      },
      error: () => {
        this._snackBar.open('Only coaches can created a course','Close', {
          duration: 1000
        })
      }
    });
  }

}
