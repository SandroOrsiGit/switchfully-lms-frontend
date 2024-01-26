import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ButtonComponent} from "../button/button.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import { CreateCodelabDto } from '../../dtos/CreateCodelabDto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-codelab-form',
  standalone: true,
  imports: [
    CommonModule,    
    ButtonComponent,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-codelab-form.component.html',
  styleUrl: './create-codelab-form.component.css'
})
export class CreateCodelabFormComponent {
  @Output() onSubmit = new EventEmitter<CreateCodelabDto>();

  name = new FormControl('', [Validators.required]);
  nameError: string = 'You must enter a value';
  
  createCodelabForm = new FormGroup({
    name: this.name,
  })

  onCreate() {
    this.onSubmit.emit({name: this.name.value!});
  }

}
