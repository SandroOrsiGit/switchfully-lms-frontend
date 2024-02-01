import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { KeycloakService } from '../services/keycloak.service';
import { UserService } from '../services/user.service';

export const authGuard: CanActivateFn = () => {
  const userService = inject(UserService);
  const keycloakService = inject(KeycloakService);
  const router = inject(Router);

  return new Promise<boolean>((resolve, reject) => {
    keycloakService.isTokenValid().subscribe(isValid => {
      if (isValid) {
        userService.getUserByToken().subscribe(
          (user) => {
            userService.setCurrentUser(user);
            resolve(!!user);
          },
          () => reject(false)
        );
      } else {
        router.navigate(['/login']);
        resolve(false);
      }
    });
  });
};
