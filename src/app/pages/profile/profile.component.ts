import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {KeycloakService} from '../../services/keycloak.service';
import {Router} from '@angular/router';
import { User } from '../../models/User';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  keycloakService = inject(KeycloakService);
  router = inject(Router)
  editing: boolean = false;
  user$?: User;
  token?: string;

  constructor() {
  }

  ngOnInit() {
    console.log('test');
    if(!this.keycloakService.isLoggedIn()){
      console.log('test');
      this.router.navigate(['/login']);
    }
    this.token = this.keycloakService.getToken();
  }

  toggleEditing(): void {
    this.editing = !this.editing;
  }
}
