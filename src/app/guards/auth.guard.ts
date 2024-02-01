import { CanActivateFn } from '@angular/router';
import { inject } from "@angular/core";
import { KeycloakService } from '../services/keycloak.service';
import { UserService } from '../services/user.service';

export const authGuard: CanActivateFn = () => {
  const userService = inject(UserService);
  const keycloakService = inject(KeycloakService);

  return new Promise<boolean>((resolve, reject) => {
    if (keycloakService.isTokenValid()) {
      userService.getUserByToken().subscribe(
        (user) => {
          userService.setCurrentUser(user);
          resolve(!!user);
        },
        () => reject(false)
      );
    } else {
      resolve(false);
    }
  });
};
