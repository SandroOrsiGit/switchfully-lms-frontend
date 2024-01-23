import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { CreateUserDto } from '../dtos/CreateUserDto';
import { User } from '../models/User';
import {Observable} from "rxjs";
import { UserMapper } from '../mappers/user.mapper';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string;
  private user?: User;

  constructor(private http: HttpClient) {
    this.url = `${environment.backendUrl}/user`;
  }

  addUser(user : CreateUserDto) : Observable<CreateUserDto> {
    return this.http.post<CreateUserDto>(`${this.url}/register`, user)
  }

  updateProfile(updateProfileForm: Partial<any>): Observable<any> {

    const user = UserMapper.toUser(updateProfileForm);

    // TODO send password info to keycloak

    const UpdateUserDto = {
      "id": user.id,
      "email": user.email,
      "displayName": user.displayName
    }

    return this.http.put<CreateUserDto>(`${this.url}/update`, UpdateUserDto);
  }

  getUserByToken(): Observable<User> {
    return this.http.get<User>(this.url);
  }

  setCurrentUser(user: User) {
    this.user = user;
  }

  getCurrentUser(): User | undefined {
    console.log('Hello')
    return this.user;
  }

}
