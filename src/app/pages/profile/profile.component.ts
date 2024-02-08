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
import { MatIconModule } from '@angular/material/icon';
import {CreateClassGroupComponent} from "../create-class-group/create-class-group.component";
import {ButtonComponent} from "../../components/button/button.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatIconModule, CreateClassGroupComponent, ButtonComponent, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  private _userService: UserService = inject(UserService);
  keycloakService = inject(KeycloakService);
  router = inject(Router);
  private _snackBar = inject(MatSnackBar);
  user?: User = this._userService.getCurrentUser();
  updateProfileButton: string = "Update profile";

  id = new FormControl(this.user?.id);
  email = new FormControl(this.user?.email, [Validators.required, Validators.email]);
  displayName = new FormControl(this.user?.displayName, [Validators.required])
  updateProfileForm = new FormGroup({
    id: this.id,
    email: this.email,
    displayName: this.displayName,
  },
  )

  constructor() {}

  ngOnInit() {
    if(!this.keycloakService.isLoggedIn()){
      this.router.navigate(['/login']);
    }
  }

  updateProfile() {
    // TODO no empty password allowed
    this._userService.updateProfile(this.updateProfileForm.value).subscribe(
      {
        next: () => {
          this._snackBar.open('DisplayName Succesfully Updated', 'Close', {
            duration: 1000
          });
        }
      }
    );
  }
}
