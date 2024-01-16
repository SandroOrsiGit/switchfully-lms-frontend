import { Component } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
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
  registerMessage = 'Registered Successfully';
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  registerForm = new FormGroup(
    {
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      passwordConfirm: new FormControl(null, [Validators.required]),
    },
    
  );

  constructor(
    private router: Router,
   
    private snackBar: MatSnackBar,
   
  ) {}

  register() {
   
  }
  
}