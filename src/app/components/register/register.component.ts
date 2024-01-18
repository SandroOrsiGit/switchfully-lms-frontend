import {Component, inject} from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup, MinValidator } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormValidator } from "./form-validator";
import { MatCardModule } from "@angular/material/card";
import { UserService } from '../../services/user.service';
import { UserMapper } from '../../mapper/user.mapper';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule],
})
export class RegisterComponent {
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  displayName = new FormControl('', [Validators.required])
  password = new FormControl('', [Validators.required])
  passwordConfirm = new FormControl('', [Validators.required])
  private userService = inject(UserService)

  registerForm = new FormGroup({
    email: this.email,
    displayName: this.displayName,
    password: this.password,
    passwordConfirm: this.passwordConfirm
  },
    { validators: FormValidator.passwordsMatch }
  )

  register() {
    console.log(this.registerForm.value)
    this.userService.addUser(UserMapper.toUser(this.registerForm.value)).subscribe(
      data => {
        console.warn(data);
      }
    )

  }

}
