import {inject, Injectable} from '@angular/core';
import {Classgroup} from "../model/Classgroup";
import {environment} from "../../environments/environments";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ClassGroup} from '../models/ClassGroup';

@Injectable({
  providedIn: 'root'
})
export class ClassgroupService {
  private readonly url: string  = `${environment.backendUrl}/classgroup`

  private http: HttpClient = inject(HttpClient);
  constructor() { }

  createClassgroup(newClassgroup: Classgroup) {
    console.log('service: ',newClassgroup);
      return this.http.post<Classgroup>(this.url, newClassgroup);
  }

  getClassGroupsByUserId(userId: number | undefined): Observable<ClassGroup[]>  {
    return this.http.get<ClassGroup[]>(this.url + '?studentId=' + userId)
  }
}
