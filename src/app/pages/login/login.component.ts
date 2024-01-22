import {Component, inject} from '@angular/core';
import { KeycloakService } from '../../services/keycloak.service';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import {UserService} from '../../services/user.service';
import {ClassgroupService} from '../../services/classgroup.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginFormComponent, MatFormFieldModule, MatCardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private keycloakService = inject(KeycloakService);
  private userService = inject(UserService);
  private classGroupService = inject(ClassgroupService);

  constructor() { }

  onLogin(loginData: any) {
    return this.keycloakService.login(loginData).subscribe({
      next: _ => {
        this.userService.getUserByToken().subscribe(user => {
          this.classGroupService.getClassGroupsByUserId(user.id).subscribe(classes => user.classes = classes);
          this.userService.setCurrentUser(user);
        })
      },
      error: _ => console.error });
  }
}
