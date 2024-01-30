import {Component, inject, OnInit} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { ButtonComponent } from "../../components/button/button.component";
import { CommonModule } from "@angular/common";
import { ClassGroupService } from "../../services/class-group.service";
import { MatCardModule } from "@angular/material/card";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import {ActivatedRoute, Router} from "@angular/router";
import { FormValidator } from '../../utils/form-validators';
import { MatSnackBar } from '@angular/material/snack-bar';
import {UserService} from "../../services/user.service";
import {User} from "../../models/User";
import {CourseDto} from "../../dtos/CourseDto";
import {CourseService} from "../../services/course.service";
import {MatSelectModule} from "@angular/material/select";


@Component({
  selector: 'app-create-class-group',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ButtonComponent, ReactiveFormsModule,
    CommonModule, MatCardModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule],
  templateUrl: './create-class-group.component.html',
  styleUrl: './create-class-group.component.css',
})

export class CreateClassGroupComponent implements OnInit {
  private _route: ActivatedRoute = inject(ActivatedRoute);
  private _router: Router = inject(Router);
  private _snackBar = inject(MatSnackBar);
  private _classGroupService: ClassGroupService = inject(ClassGroupService);
  private _courseService: CourseService = inject(CourseService);
  private _courses: CourseDto[] = [];

  buttonName: string = 'Create class group';
  private _userService: UserService = inject(UserService);
  private currentUser?: User = this._userService.getCurrentUser();

  name = new FormControl('', [Validators.required]);
  startDate: FormControl<Date | null> = new FormControl(null, [Validators.required]);
  endDate: FormControl<Date | null> = new FormControl(null, [Validators.required]);
  courseIds: FormControl<number[] | null> = new FormControl([], [Validators.required]);

  createClassGroupForm = new FormGroup({
      name: this.name,
      startDate: this.startDate,
      endDate: this.endDate,
      courseIds: this.courseIds
    },
    { validators: FormValidator.dateLessThan }
  );

  ngOnInit(): void {
    const courseId = this._route.snapshot.queryParamMap.get('courseId');
    if (courseId !== null) {
      this.courseIds.setValue([parseInt(courseId)])
    }
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

  onSubmit() {
    const classGroup = {
      name: this.name.value!,
      startDate: this.convertDate(this.startDate.value!),
      endDate: this.convertDate(this.endDate.value!),
      courseIds: this.courseIds.value!
    }
    this._classGroupService.createClassGroup(classGroup).pipe().subscribe({
      next: () => {
        this.activateSnackBar();
        this.gotoProfilePage();
      }
    });
  }

  convertDate(date: Date): Date {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    return new Date(year + '-' + month + '-' + day);
  }

  gotoProfilePage() {
    this._router.navigate(['profile']);
  }

  activateSnackBar() {
    this._snackBar.open('Class group created successfully', 'Close', {
      duration: 5000
    });
  }
}
