import {Component, inject, OnInit} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from "../../components/button/button.component";
import { CommonModule } from "@angular/common";
import { ClassGroupService } from "../../services/class-group.service";
import { MatCardModule } from "@angular/material/card";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { Router } from "@angular/router";
import { FormValidator } from '../../utils/form-validators';
import { MatSnackBar } from '@angular/material/snack-bar';
import {UserService} from "../../services/user.service";
import {User} from "../../models/User";


@Component({
  selector: 'app-create-class-group',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ButtonComponent, ReactiveFormsModule,
    CommonModule, MatCardModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './create-class-group.component.html',
  styleUrl: './create-class-group.component.css',
})

export class CreateClassGroupComponent implements OnInit {
  buttonName: string = 'Create class group';

  createClassGroupForm: FormGroup;

  private classGroupService: ClassGroupService = inject(ClassGroupService);
  private userService: UserService = inject(UserService);
  private currentUser?: User = this.userService.getCurrentUser();
  private formBuilder: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private _snackBar = inject(MatSnackBar);

  ngOnInit(): void {

    this.createClassGroupForm = this.formBuilder.group({
      name: ['name', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    }, { validator: FormValidator.dateLessThan('startDate', 'endDate') });
  }

  onSubmit() {
    const newClassGroup = this.createClassGroupForm.value;
    newClassGroup.startDate = this.convertDate(newClassGroup.startDate);// To fix timezone issue
    newClassGroup.endDate = this.convertDate(newClassGroup.endDate);// To fix timezone issue
    newClassGroup.coachId = this.currentUser?.id;

    this.classGroupService.createClassGroup(newClassGroup).pipe().subscribe({
      next: () => {
        this.activateSnackBar();
      }
    })
    this.gotoProfilePage();
  }

  convertDate(date: any) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    return year + '-' + month + '-' + day
  }

  gotoProfilePage() {
    this.router.navigate(['profile']);
  }

  activateSnackBar() {
    this._snackBar.open('Class group created successfully', 'Close', {
      duration: 5000
    });
  }
}
