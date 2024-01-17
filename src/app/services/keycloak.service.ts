import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpKeycloakService } from './http-keycloak.service';
import { Observable, tap } from 'rxjs';
import { KeycloakTokenResponse } from './KeycloakTokenResponse';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  private TOKEN_KEY_NAME: string = 'keycloak-token';

  constructor(private http: HttpClient, private httpKeycloakService: HttpKeycloakService ) { }

  login(loginData: {email: string, password: string}): Observable<KeycloakTokenResponse> {
    return this.httpKeycloakService.login(loginData).pipe(
      tap(response => this.setToken(response.access_token))
    );
  }

  private setToken(accessToken: string): void {
    sessionStorage.setItem(this.TOKEN_KEY_NAME, accessToken);
    console.log(accessToken)
  }

  getToken(): string {
    return sessionStorage.getItem(this.TOKEN_KEY_NAME)  || '';
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  logout(): void {
    sessionStorage.removeItem(this.TOKEN_KEY_NAME);
  }
}
