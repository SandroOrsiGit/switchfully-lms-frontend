import {Component, inject} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
    userService = inject(UserService);
  message() {
    return 'Logged in as ' + this.userService.getCurrentUser()?.role + ' ' + this.userService.getCurrentUser()?.displayName;
  }

}
