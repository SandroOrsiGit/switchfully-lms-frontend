import {Component, inject} from '@angular/core';
import { KeycloakService } from '../../services/keycloak.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import {UserService} from '../../services/user.service';
import {ClassGroupService} from '../../services/class-group.service';
import {ButtonComponent} from "../../components/button/button.component";
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatCardModule, ButtonComponent, FormsModule, MatIconModule, MatInputModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private keycloakService = inject(KeycloakService);
  private userService = inject(UserService);
  private classGroupService = inject(ClassGroupService);
  router = inject(Router);
  private _snackBar = inject(MatSnackBar);

  email = new FormControl('test@lms.com', [Validators.required, Validators.email]);
  password = new FormControl('student', [Validators.required]);
  hide: boolean = true;

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }

    return this.password.hasError('password') ? 'Not a valid password' : '';
  }
  onLogin() {
    return this.keycloakService.login({email: this.email.value!, password: this.password.value!}).subscribe({
      next: _ => {
        this.userService.getUserByToken().subscribe(user => {
          this.classGroupService.getClassGroupsByUserId(user.id).subscribe(classes => user.classes = classes);
          this.userService.setCurrentUser(user);
          this.router.navigate(['/profile']);
        });
      },
      error: _ => {
        this._snackBar.open('Invalid credentials','Close');
      }
    });
  }
}
