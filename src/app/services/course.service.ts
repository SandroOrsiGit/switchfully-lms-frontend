import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {Observable} from "rxjs";
import {CreateCourseDto} from "../dtos/CreateCourseDto";
import {CourseDto} from "../dtos/CourseDto";

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private _url: string;

  constructor(private http: HttpClient) {
    this._url = `${environment.backendUrl}/courses`;
  }

  createCourse(createCourseDto: CreateCourseDto): Observable<CourseDto> {
    return this.http.post<CourseDto>(this._url, createCourseDto);
  }

  getCourses(): Observable<CourseDto[]> {
    return this.http.get<CourseDto[]>(this._url);
  }
}
