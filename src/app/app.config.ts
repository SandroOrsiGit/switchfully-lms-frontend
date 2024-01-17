import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideAnimations} from "@angular/platform-browser/animations";
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { keycloakInterceptor } from './interceptor/keycloak.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(), provideHttpClient(withInterceptors([keycloakInterceptor]))]
};
