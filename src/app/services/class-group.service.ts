import {inject, Injectable} from '@angular/core';
import {CreateClassGroupDto} from "../dtos/CreateClassGroupDto";
import {environment} from "../../environments/environments";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ClassGroup} from '../models/ClassGroup';

@Injectable({
  providedIn: 'root'
})
export class ClassGroupService {
  private readonly url: string  = `${environment.backendUrl}/class-groups`

  private http: HttpClient = inject(HttpClient);
  constructor() { }

  createClassGroup(newClassGroup: CreateClassGroupDto) {
    return this.http.post<CreateClassGroupDto>(this.url, newClassGroup);
  }

  getClassGroupsByUserId(userId: number | undefined): Observable<ClassGroup[]>  {
    return this.http.get<ClassGroup[]>(this.url + '?userId=' + userId)
  }

  getClassGroupByClassGroupId(classGroupId: number | undefined): Observable<ClassGroup>  {
    return this.http.get<ClassGroup>(this.url + '/' + classGroupId)
  }

}
