import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { CreateUser } from '../model/createUser';
import {Observable} from "rxjs";
import { UserMapper } from '../mapper/user.mapper';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.backendUrl}/user`;
  }

  addUser(user : CreateUser) : Observable<CreateUser> {
    console.log(this.url)
    console.log(user)
    return this.http.post<CreateUser>(`${this.url}/register`, user)
  }

  updateProfile(updateProfileForm: Partial<any>): Observable<any> {

    const user = UserMapper.toUser(updateProfileForm);

    // TODO send password info to keycloak

    const UpdateUserDto = {
      "id": user.id,
      "email": user.email,
      "displayName": user.displayName
    }

    return this.http.put<CreateUser>(`${this.url}/update`, UpdateUserDto);
  }

}
