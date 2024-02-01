import { CanActivateFn } from '@angular/router';
import {inject} from "@angular/core";
import { KeycloakService } from '../services/keycloak.service';

export const authGuard: CanActivateFn = () => {
  const keycloakService  = inject(KeycloakService);
  return keycloakService.isLoggedIn();
};
