import {Component, inject} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from "@angular/material/card";
import { UserService } from '../../services/user.service';
import { UserMapper } from '../../mappers/user.mapper';
import { FormValidator } from '../../utils/form-validators';
import { ButtonComponent } from '../../components/button/button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    ButtonComponent,
    RouterLink,
  ],
})
export class RegisterComponent {
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  displayName = new FormControl('', [Validators.required])
  password = new FormControl('', [Validators.required])
  passwordConfirm = new FormControl('', [Validators.required])
  private userService = inject(UserService);
  logoLMS: string = '../assets/logoLMS.png';

  registerForm = new FormGroup({
    email: this.email,
    displayName: this.displayName,
    password: this.password,
    passwordConfirm: this.passwordConfirm
  },
    { validators: FormValidator.passwordsMatch }
  )

  register() {
    this.userService.addUser(UserMapper.toCreateUser(this.registerForm.value)).subscribe();
  }
}
