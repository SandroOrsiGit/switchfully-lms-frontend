import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _url: string;

  constructor(private http: HttpClient) {
    this._url = `${environment.keycloakUrl}`;
   }

  login(): Observable<User> {
    return this.http.get<User>(this._url);
  }
}
