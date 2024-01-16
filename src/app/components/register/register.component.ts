import { Component } from '@angular/core';

import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup, MinValidator} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule,FormsModule, ReactiveFormsModule, MatButtonModule],
})
export class RegisterComponent {
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  displayName = new FormControl('', [Validators.required])
  password = new FormControl('', [Validators.required])
  passwordConfirm = new FormControl('', [Validators.required])


  getErrorMessage() {
    if (this.email.hasError('required') || this.displayName.hasError('required') || this.password.hasError('required') || this.passwordConfirm.hasError('required') )
    {
      return 'You must enter a value';
    }


    return this.email.hasError('email') ? 'Not a valid email' : '';
  }


  register() {

  }

}
