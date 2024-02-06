import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { CreateUserDto } from '../dtos/CreateUserDto';
import { User } from '../models/User';
import { Observable, tap } from "rxjs";
import { UserMapper } from '../mappers/user.mapper';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentDto } from "../dtos/StudentDto"; // import MatSnackBar

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string;
  private user?: User;
  private http: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);
  private snackbar: MatSnackBar = inject(MatSnackBar);

  constructor() {
    this.url = `${environment.backendUrl}/users`;
  }

  addUser(user: CreateUserDto): Observable<CreateUserDto> {
    return this.http.post<CreateUserDto>(this.url, user).pipe(
      tap(() => {
        this.router.navigate(['/login']);
        this.snackbar.open('User created successfully', 'Close', {
          duration: 5000
        });
      }) // Added closing parenthesis here
    );
  }

  updateProfile(updateProfileForm: Partial<any>): Observable<any> {

    const user = UserMapper.toUser(updateProfileForm);

    const UpdateUserDto = {
      'id': user.id,
      'email': user.email,
      'displayName': user.displayName
    }

    return this.http.put<CreateUserDto>(this.url, UpdateUserDto);
  }

  getUserByToken(): Observable<User> {
    return this.http.get<User>(this.url);
  }

  setCurrentUser(user: User | undefined) {
    this.user = user;
  }

  getCurrentUser(): User | undefined {
    return this.user;
  }

  isCoach() {
    return this.getCurrentUser()?.role === 'coach';
  }

  isStudent() {
    return this.getCurrentUser()?.role === 'student';
  }

  getAllStudents(): Observable<StudentDto[]> {
    return this.http.get<StudentDto[]>(this.url + '/students')
  }
}
