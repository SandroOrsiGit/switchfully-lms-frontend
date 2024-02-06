import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ModuleService} from "../../services/module.service";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ModuleDto} from "../../dtos/ModuleDto";
import {MatCardModule} from "@angular/material/card";
import {ButtonComponent} from "../../components/button/button.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {CourseService} from "../../services/course.service";
import {CourseDto} from "../../dtos/CourseDto";
import {Location} from "@angular/common";

@Component({
  selector: 'app-module-edit',
  standalone: true,
  imports: [
    MatCardModule,
    ButtonComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  templateUrl: './module-edit.component.html',
  styleUrl: './module-edit.component.css'
})
export class ModuleEditComponent implements OnInit {
  private _courseService: CourseService = inject(CourseService);
  private _moduleService: ModuleService = inject(ModuleService);
  private _route: ActivatedRoute = inject(ActivatedRoute);
  private _snackBar = inject(MatSnackBar);
  private _module: ModuleDto;
  private _courses: CourseDto[] = [];
  private _location: Location = inject(Location);

  name: FormControl<string | null> = new FormControl(null, [Validators.required]);
  courseIds: FormControl<number[] | null> = new FormControl(null, [Validators.required]);

  editModuleForm = new FormGroup( {
    name: this.name,
    courseIds: this.courseIds
  });

  ngOnInit() {
    this.getModule();
    this.getCourses();
  }

  private getCourses() {
    this._courseService.getCourses().subscribe({
      next: courses => this._courses = courses
    });
  }

  private getModule() {
    this._route.params.subscribe(params => {
      const moduleId = params['moduleId'];

      this._moduleService.getModule(moduleId).subscribe({
        next: moduleDto => {
          this._module = moduleDto;
          this.name.setValue(this._module.name);
          this.courseIds.setValue(this._module.courses.map((course) => course.id));
        }
      })
    });
  }

  onEdit() {
    return this._moduleService.editModule(this._module.id, {name: this.name.value!, courseIds: this.courseIds.value!}).subscribe({
      next: () => {
        this._snackBar.open('Successfully edited module', 'Close', {
          duration: 1000
        });
        this._location.back();
      },
      error: () => {
        this._snackBar.open('Only coaches can edit a module', 'Close', {
          duration: 1000
        });
      }
    });
  }

  get courses(): CourseDto[] {
    return this._courses;
  }

  get module() {
    return this._module;
  }
}
