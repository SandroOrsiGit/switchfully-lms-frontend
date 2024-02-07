import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ProgressDto } from '../dtos/ProgressDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  private _url: string;

  constructor(private http: HttpClient) {
    this._url = `${environment.backendUrl}/progresses`;
  }

  getProgressOptions(): Observable<ProgressDto[]> {
    return this.http.get<ProgressDto[]>(this._url)
  }

}
