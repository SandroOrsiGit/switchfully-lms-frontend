import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {KeycloakService} from '../../services/keycloak.service';
import {Router} from '@angular/router';
import { User } from '../../models/User';
import {UserService} from '../../services/user.service';
import {ClassGroupService} from '../../services/class-group.service';
import {ClassGroup} from '../../models/ClassGroup';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  keycloakService = inject(KeycloakService);
  classGroupService = inject(ClassGroupService)
  userService = inject(UserService);
  router = inject(Router)
  editing: boolean = false;
  user?: User;
  classGroupsForCurrentUser?: ClassGroup[];

  constructor() {
  }

  ngOnInit() {
    if(!this.keycloakService.isLoggedIn()){
      this.router.navigate(['/login']);
    }

    this.user = this.userService.getCurrentUser();
    this.classGroupService.getClassGroupsByUserId(this.user?.id)

  }

  toggleEditing(): void {
    this.editing = !this.editing;
  }
}
