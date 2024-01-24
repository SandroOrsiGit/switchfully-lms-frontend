import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {CreateModuleDto} from "../dtos/CreateModuleDto";
import {Observable} from "rxjs";
import {Module} from "../models/Module";
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
}
