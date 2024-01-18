import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormValidator } from '../../components/register/form-validator';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  userService: UserService = inject(UserService);
  editing: boolean = false;
  emailInUseError$?: string;
  student$: any = {
    id: 1,
    displayName: 'test',
    email: 'test@test',
    password: 'test',
    classes: ['Java', '.NET']
  };

  hide = true;
  id = new FormControl(this.student$.id);
  email = new FormControl(this.student$.email, [Validators.required, Validators.email]);
  displayName = new FormControl(this.student$.displayName, [Validators.required])
  password = new FormControl(this.student$.password, [Validators.required])
  passwordConfirm = new FormControl(this.student$.password, [Validators.required])


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

  ngOnInit() {}

  toggleEditing(): void {
    this.editing = !this.editing;
  }

  updateProfile() {
    // TODO no empty password allowed
    console.log(this.updateProfileForm.value)
    this.userService.updateProfile(this.updateProfileForm.value).subscribe(
      {
        next: data => console.warn(data),
        error: error => this.emailInUseError$ = error.error.message
      }
    );
  }

}
