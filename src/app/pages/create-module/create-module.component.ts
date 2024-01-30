import {Component, inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MatCardModule} from "@angular/material/card";
import {ModuleService} from "../../services/module.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ButtonComponent} from "../../components/button/button.component";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {CourseService} from "../../services/course.service";
import {CourseDto} from "../../dtos/CourseDto";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-create-module',
  standalone: true,
  imports: [
    MatCardModule,
    ButtonComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    NgForOf
  ],
  templateUrl: './create-module.component.html',
  styleUrl: './create-module.component.css'
})
export class CreateModuleComponent implements  OnInit {
  private _router = inject(Router);
  private _snackBar = inject(MatSnackBar);
  private _courseService: CourseService = inject(CourseService);
  private _moduleService: ModuleService = inject(ModuleService);
  private _courses: CourseDto[] = [];

  name = new FormControl('', [Validators.required]);
  courseIds = new FormControl([], [Validators.required]);

  createModuleForm = new FormGroup( {
    name: this.name,
    courseIds: this.courseIds
  });

  private getCourses() {
    this._courseService.getCourses().subscribe({
      next: courses => this._courses = courses
    });
  }

  get courses(): CourseDto[] {
    return this._courses;
  }

  ngOnInit() {
    this.getCourses();
  }

  onCreate() {
    this._moduleService.createModule({name: this.name.value!, courseIds: this.courseIds.value!}).subscribe(
      {
        next: () => {
          this._router.navigate(['/profile']);
        },
        error: () => {
          this._snackBar.open('Only coaches can create a module','Close');
        }
      }
    );
  }

}
