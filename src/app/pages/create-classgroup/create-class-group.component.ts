import {Component, inject, OnInit} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ButtonComponent} from "../../components/button/button.component";
import {CommonModule} from "@angular/common";
import {ClassGroupService} from "../../services/class-group.service";
import {MatCardModule} from "@angular/material/card";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";


@Component({
  selector: 'app-create-class-group',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ButtonComponent, ReactiveFormsModule, CommonModule, MatCardModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './create-class-group.component.html',
  styleUrl: './create-class-group.component.css',
})

export class CreateClassGroupComponent implements OnInit{
  buttonName = 'Submit';

  createClassGroupForm: FormGroup;

  private classGroupService: ClassGroupService = inject(ClassGroupService);
  private formBuilder: FormBuilder = inject(FormBuilder);

  ngOnInit(): void {

    this.createClassGroupForm = this.formBuilder.group( {
      name: ['name'],
      startDate: [''],
      endDate: ['']
    });
  }

  onSubmit() {
    let newClassGroup = this.createClassGroupForm.value;
    newClassGroup.startDate = this.convertDate(newClassGroup.startDate);// To fix timezone issue
    newClassGroup.endDate = this.convertDate(newClassGroup.endDate);// To fix timezone issue

    this.classGroupService.createClassGroup(newClassGroup)
      .subscribe();
  }

  convertDate(date: any) {
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0')
    let day = String(date.getDate()).padStart(2, '0')

    return year + '-' + month + '-' + day
  }
}