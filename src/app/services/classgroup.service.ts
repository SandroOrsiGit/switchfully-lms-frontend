import {inject, Injectable} from '@angular/core';
import {CreateClassgroupDto} from "../dtos/CreateClassgroupDto";
import {environment} from "../../environments/environments";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Classgroup} from '../models/Classgroup';

@Injectable({
  providedIn: 'root'
})
export class ClassgroupService {
  private readonly url: string  = `${environment.backendUrl}/classgroup`

  private http: HttpClient = inject(HttpClient);
  constructor() { }

  createClassgroup(newClassgroup: CreateClassgroupDto) {
    return this.http.post<CreateClassgroupDto>(this.url, newClassgroup);
  }

  getClassGroupsByUserId(userId: number | undefined): Observable<Classgroup[]>  {
    return this.http.get<Classgroup[]>(this.url + '?studentId=' + userId)
  }
}
