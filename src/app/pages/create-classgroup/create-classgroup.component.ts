import {Component, inject, OnInit} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ButtonComponent} from "../../components/button/button.component";
import {CommonModule} from "@angular/common";
import {ClassgroupService} from "../../services/classgroup.service";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
import {MatCardModule} from "@angular/material/card";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";

@Component({
  selector: 'app-create-classgroup',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ButtonComponent, ReactiveFormsModule, CommonModule, MatCardModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './create-classgroup.component.html',
  styleUrl: './create-classgroup.component.css',
})
export class CreateClassgroupComponent implements OnInit{
  buttonName = '';
  createClassgroupForm: FormGroup;

  private classgroupService: ClassgroupService = inject(ClassgroupService);
  private formBuilder: FormBuilder= inject(FormBuilder);

  ngOnInit(): void {
    this.buttonName = 'Submit';
    this.createClassgroupForm = this.formBuilder.group( {
      name: ['name'],
      startDate: [''],
      endDate: ['']
    });
  }

  onSubmit() {
    console.log("submit button clicked")
    let newClassgroup = this.createClassgroupForm.value;
    console.log("create onsubmit: ",newClassgroup);
    this.classgroupService.createClassgroup(newClassgroup)
          .subscribe(response => console.log("created",response));

    // this.classgroupService.createClassgroup(newClassgroup)
    //       .subscribe({error: console.error});
    //   this.classgroupService.createClassgroup(newClassgroup)
    //       .subscribe({complete: console.info});
  }
}
