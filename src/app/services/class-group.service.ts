import {inject, Injectable} from '@angular/core';
import {CreateClassGroupDto} from "../dtos/CreateClassGroupDto";
import {environment} from "../../environments/environment.dev";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ClassGroupDto} from '../dtos/ClassGroupDto';
import {ClassGroupOverviewDto} from "../dtos/ClassGroupOverviewDto";

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

  getClassGroupsByUserId(userId: number | undefined): Observable<ClassGroupOverviewDto[]>  {
    return this.http.get<ClassGroupOverviewDto[]>(this.url + '?userId=' + userId)
  }

  getClassGroupByClassGroupId(classGroupId: number | undefined): Observable<ClassGroupDto>  {
    return this.http.get<ClassGroupDto>(this.url + '/' + classGroupId)
  }

  getAllClassGroups(): Observable<ClassGroupOverviewDto[]> {
    return this.http.get<ClassGroupOverviewDto[]>(this.url + '/all');
  }

  addStudentToClassGroup(linkStudent: {classGroupId: number, studentId: number}): Observable<ClassGroupDto> {
    return this.http.post<ClassGroupDto>(this.url + '/add-student', linkStudent);
  }

}
