import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string;
  
  constructor(private http: HttpClient) {
    this.url = `${environment.backendUrl}/test`;
  }

  addUser(user : User)  {
    console.log(user)
    this.http.post<User>(this.url, user)
  }

}
