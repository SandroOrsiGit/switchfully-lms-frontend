import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  private _url: string;

  constructor(private http: HttpClient) {
    this._url = `${environment.backendUrl}/test`;
   }

   getPublic(): Observable<string>{
    return this.http.get<string>(`${this._url}`);
   }

   getStudentAuth(): Observable<string>{
    return this.http.get<string>(`${this._url}/student`);
   }

   getCoachAuth(): Observable<string>{
    return this.http.get<string>(`${this._url}/coach`);
   }
   



}
