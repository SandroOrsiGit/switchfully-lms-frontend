import { CanActivateFn, Router } from '@angular/router';
import { UserService } from "../services/user.service";
import { inject } from "@angular/core";
import { KeycloakService } from '../services/keycloak.service';

export const coachGuard: CanActivateFn = () => {
  const router = inject(Router);
  const userService = inject(UserService);
  const keycloakService = inject(KeycloakService);


  return new Promise<boolean>((resolve, reject) => {
    keycloakService.isTokenValid().subscribe(isValid => {
      if (isValid) {
        userService.getUserByToken().subscribe(
          (user) => {
            userService.setCurrentUser(user);
            resolve(user?.role == 'coach');
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

