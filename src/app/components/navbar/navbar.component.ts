import {Component, inject} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import {UserService} from "../../services/user.service";
import {NgIf} from "@angular/common";
import { KeycloakService } from '../../services/keycloak.service';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, RouterLink, NgIf, MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'

})
export class NavbarComponent {
    userService = inject(UserService);
    keycloackService = inject(KeycloakService);
    logoLMS: string = '../assets/logoLMS.png';

  message() {
    return 'Welcome ' + this.userService.getCurrentUser()?.displayName;
  }

}
