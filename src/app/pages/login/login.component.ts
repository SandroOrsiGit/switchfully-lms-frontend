import { Component } from '@angular/core';
import { KeycloakService } from '../../services/keycloak.service';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginFormComponent, MatFormFieldModule, MatCardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private keycloakService: KeycloakService) { }

  onLogin(loginData: any) {
    return this.keycloakService.login(loginData).subscribe({ error: console.error });
  }
}
