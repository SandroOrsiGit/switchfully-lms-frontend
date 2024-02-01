import { CanActivateFn } from '@angular/router';
import {UserService} from "../services/user.service";
import {inject} from "@angular/core";
import { KeycloakService } from '../services/keycloak.service';

export const coachGuard: CanActivateFn = () => {
  const userService = inject(UserService);
  const keycloakService = inject(KeycloakService);

  return new Promise<boolean>((resolve, reject) => {
    if (keycloakService.isTokenValid()) {
      userService.getUserByToken().subscribe(
        (user) => {
          userService.setCurrentUser(user);
          resolve(user?.role == 'coach');
        },
        () => reject(false)
      );
    } else {
      resolve(false);
    }
  });
};

