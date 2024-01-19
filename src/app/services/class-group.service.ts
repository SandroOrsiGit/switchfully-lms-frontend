import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.development';
import {ClassGroup} from '../models/ClassGroup';

@Injectable({
  providedIn: 'root'
})
export class ClassGroupService {
  private http = inject(HttpClient);
  private url: string;

  constructor() {
    this.url = `${environment.backendUrl}/classgroup`
  }

  getClassGroupsByUserId(userId: number | undefined): Observable<ClassGroup[]>  {
    return this.http.get<ClassGroup[]>(this.url + '/' + userId)
}
}
