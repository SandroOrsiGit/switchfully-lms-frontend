import {Component, inject} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import {UserService} from "../../services/user.service";
import {NgIf} from "@angular/common";
import { KeycloakService } from '../../services/keycloak.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, RouterLink, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
    userService = inject(UserService);
    keycloackService = inject(KeycloakService);
  message() {
    return 'Logged in as ' + this.userService.getCurrentUser()?.role + ' ' + this.userService.getCurrentUser()?.displayName;
  }

}
