import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from "@angular/core";
import { KeycloakService } from '../services/keycloak.service';
import { environment } from '../../environments/environment.dev';

export const keycloakInterceptor: HttpInterceptorFn = (req, next) => {
  const keycloakService = inject(KeycloakService);

  if (req.url.includes(`${environment.backendUrl}`)
    && keycloakService.getToken()
    && req.url !== 'http://localhost:8080/user/register'
    /* && 'https://keycloak.switchfully.com/realms/java-2023-10/protocol/openid-connect/token' */
    ) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${keycloakService.getToken()}`
      }
    });
  }

  return next(req);
};
