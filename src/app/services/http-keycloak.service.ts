import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { KeycloakTokenResponse } from './KeycloakTokenResponse';

@Injectable({
  providedIn: 'root'
})
export class HttpKeycloakService {
  private _url: string;

  private httpOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };

  constructor(private http: HttpClient) {
    this._url = environment.keycloakUrl;
  }

   login(loginData: {email: string, password: string}): Observable<KeycloakTokenResponse> {
    const body = new URLSearchParams();
    body.set('username', loginData.email);
    body.set('password', loginData.password);
    body.set('client_id', 'keycloak-example');
    body.set('grant_type', 'password');

    return this.http.post<KeycloakTokenResponse>(`${this._url}`, body.toString(), this.httpOptions);

   }
}
