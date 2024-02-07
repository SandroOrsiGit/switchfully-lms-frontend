import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {KeycloakService} from '../services/keycloak.service';
import {environment} from '../../environments/environment.dev';

export const keycloakInterceptor: HttpInterceptorFn = (req, next) => {
  const keycloakService = inject(KeycloakService);

  if (req.url.includes(`${environment.backendUrl}`)
    && keycloakService.getToken()
    && req.url !== `${environment.backendUrl}/user/register`
  ) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${keycloakService.getToken()}`
      }
    });
  }

  return next(req);
};
