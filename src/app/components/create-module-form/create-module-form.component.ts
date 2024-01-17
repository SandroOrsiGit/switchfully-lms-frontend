import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ButtonComponent} from "../button/button.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-create-module-form',
  standalone: true,
  imports: [
    ButtonComponent,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-module-form.component.html',
  styleUrl: './create-module-form.component.css'
})
export class CreateModuleFormComponent {
  @Output() onSubmit = new EventEmitter<any>();

  // todo: delete pre-filled values
  name = new FormControl('test', [Validators.required]);

  constructor(private formBuilder: FormBuilder) {}

  getNameErrorMessage() {
    return 'You must enter a value';
  }

  onCreate() {
    console.log('CreateModuleFormComponent.onCreate')
    this.onSubmit.emit({name: this.name.value!});
  }
}
