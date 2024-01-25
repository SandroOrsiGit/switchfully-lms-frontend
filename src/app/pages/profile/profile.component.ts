import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {KeycloakService} from '../../services/keycloak.service';
import {Router, RouterLink} from '@angular/router';
import { User } from '../../models/User';
import {UserService} from '../../services/user.service';
import { FormValidator } from '../register/form-validator';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  userService: UserService = inject(UserService);
  keycloakService = inject(KeycloakService);
  router = inject(Router);
  editing: boolean = false;
  emailInUseError$?: string;
  user?: User = this.userService.getCurrentUser();

  hide = true;
  id = new FormControl(this.user?.id);
  email = new FormControl(this.user?.email, [Validators.required, Validators.email]);
  displayName = new FormControl(this.user?.displayName, [Validators.required])
  password = new FormControl(this.user?.password, [Validators.required])
  passwordConfirm = new FormControl(this.user?.password, [Validators.required])
  updateProfileForm = new FormGroup({
    id: this.id,
    email: this.email,
    displayName: this.displayName,
    password: this.password,
    passwordConfirm: this.passwordConfirm
  },
    { validators: FormValidator.passwordsMatch}
  )

  constructor() {}


  ngOnInit() {
    if(!this.keycloakService.isLoggedIn()){
      this.router.navigate(['/login']);
    }
  }

  toggleEditing(): void {
    this.editing = !this.editing;
  }

  updateProfile() {
    // TODO no empty password allowed
    this.userService.updateProfile(this.updateProfileForm.value).subscribe(
      {
        next: data => console.warn(data),
        error: error => this.emailInUseError$ = error.error.message
      }
    );
  }

}
