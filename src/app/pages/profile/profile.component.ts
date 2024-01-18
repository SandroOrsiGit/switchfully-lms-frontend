import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Observable} from 'rxjs';
import {ClassGroupService} from '../../services/class-group.service';
import {User} from '../../model/user';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormValidator } from '../../components/register/form-validator';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  editing: boolean = false;
  user$: User = {displayName: 'test',
    email: 'test@test',
    classes: ['Java', '.NET']
  };

  hide = true;
  displayName = new FormControl('', [Validators.required])
  password = new FormControl('', [Validators.required])
  passwordConfirm = new FormControl('', [Validators.required])


  updateProfile = new FormGroup({
    displayName: this.displayName,
    password: this.password,
    passwordConfirm: this.passwordConfirm
  },
    { validators: FormValidator.passwordsMatch}
  )

  constructor() {
  }

  ngOnInit() {

  }

  toggleEditing(): void {
    this.editing = !this.editing;
  }

updateProfile() {
  
}

}
