import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string;
  private user?: User;

  constructor(private http: HttpClient) {
    this.url = `${environment.backendUrl}/register`;
  }

  addUser(user : User) : Observable<User> {
    console.log(this.url)
    console.log(user)
    return this.http.post<User>(this.url, user)
  }

  getUserByToken(): Observable<User> {
    return this.http.get<User>(this.url);
  }

  setCurrentUser(user: User) {
    this.user = user;
  }

  getCurrentUser(): User | undefined {
    return this.user;
  }

}
