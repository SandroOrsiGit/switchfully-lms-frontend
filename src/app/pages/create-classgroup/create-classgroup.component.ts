import {Component, inject, OnInit} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ButtonComponent} from "../../components/button/button.component";
import {CommonModule} from "@angular/common";
import {ClassgroupService} from "../../services/classgroup.service";
import {MatCardModule} from "@angular/material/card";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";


@Component({
  selector: 'app-create-classgroup',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ButtonComponent, ReactiveFormsModule, CommonModule, MatCardModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './create-classgroup.component.html',
  styleUrl: './create-classgroup.component.css',
})

export class CreateClassgroupComponent implements OnInit{
  buttonName = 'Submit';

  createClassgroupForm: FormGroup;

  private classgroupService: ClassgroupService = inject(ClassgroupService);
  private formBuilder: FormBuilder = inject(FormBuilder);

  ngOnInit(): void {

    this.createClassgroupForm = this.formBuilder.group( {
      name: ['name'],
      startDate: [''],
      endDate: ['']
    });
  }

  onSubmit() {
    let newClassgroup = this.createClassgroupForm.value;
    newClassgroup.startDate = this.convertDate(newClassgroup.startDate);// To fix timezone issue
    newClassgroup.endDate = this.convertDate(newClassgroup.endDate);// To fix timezone issue

    this.classgroupService.createClassgroup(newClassgroup)
      .subscribe();
  }

  convertDate(date: any) {
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0')
    let day = String(date.getDate()).padStart(2, '0')

    return year + '-' + month + '-' + day
  }
}
