import {Component, inject} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {ButtonComponent} from "../../components/button/button.component";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
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
  private _courseService: CourseService = inject(CourseService);
  private _router = inject(Router);
  private _snackBar = inject(MatSnackBar);

  name = new FormControl(null, [Validators.required]);
  createCourseForm = new FormGroup( {
    name: this.name
  });

  onCreate() {
    return this._courseService.createCourse({name: this.name.value!}).subscribe({
      next: () => {
        this._snackBar.open('Successfully added a course','Close', {
          duration: 1000
        });
        this._router.navigate(['/courses']);
      },
      error: () => {
        this._snackBar.open('Only coaches can create a course','Close', {
          duration: 1000
        });
      }
    });
  }

}
