import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpKeycloakService } from './http-keycloak.service';
import { Observable, of, tap } from 'rxjs';
import { KeycloakTokenResponse } from '../models/KeycloakTokenResponse';
import { UserService } from './user.service';
import { environment } from '../../environments/environments';
@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  private _url: string;

  private TOKEN_KEY_NAME: string = 'keycloak-token';

  constructor(private http: HttpClient, private httpKeycloakService: HttpKeycloakService, private userService: UserService) {
    this._url = `${environment.backendUrl}`;
   }

  login(loginData: { email: string, password: string }): Observable<KeycloakTokenResponse> {
    return this.httpKeycloakService.login(loginData).pipe(
      tap(response => this.setToken(response.access_token))
    );
  }

  private setToken(accessToken: string): void {
    localStorage.setItem(this.TOKEN_KEY_NAME, accessToken);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY_NAME);
  }

  isLoggedIn(): any {
    this.isTokenValid().subscribe({
      next: () => {
        if (this.userService.getCurrentUser() == null) {
          this.userService.getUserByToken().subscribe(
            user => this.userService.setCurrentUser(user)
          );
        }
        return !!this.userService.getCurrentUser();
      },
      error: () => {
        this.logout();
        return false
      }
    });
  }

  isTokenValid(): Observable<boolean> {
    const token = this.getToken();
    if (!token) {
      return of(false);
    }
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<boolean>(`${this._url}/user/validate-token`, { headers });
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY_NAME);
    this.userService.setCurrentUser(undefined);
  }
}
