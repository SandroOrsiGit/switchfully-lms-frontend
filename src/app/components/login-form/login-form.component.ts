import { KeycloakService } from '../../services/keycloak.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule, ButtonComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {

  @Output() onSubmit = new EventEmitter<any>();

  // todo: delete pre-filled values
  email = new FormControl('test@lms.com', [Validators.required, Validators.email]);
  password = new FormControl('student', [Validators.required]);
  hide: boolean = true;

  constructor(private keycloakService: KeycloakService) { }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  // TODO: add more complexity on password validation
  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }

    return this.password.hasError('password') ? 'Not a valid password' : '';
  }

  onLogin() {
    this.onSubmit.emit({email: this.email.value!, password: this.password.value!});
    return this.keycloakService.login({email: this.email.value!, password: this.password.value!}).subscribe({ error: console.error });
  }
}
