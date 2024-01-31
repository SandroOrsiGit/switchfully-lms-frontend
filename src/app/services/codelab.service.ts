import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {Observable} from "rxjs";
import { CreateCodelabDto } from '../dtos/CreateCodelabDto';
import { CodelabDto } from '../dtos/CodelabDto';
import {CodelabProgressDto} from "../dtos/CodelabProgressDto";
import { UpdateCodelabProgressDto } from '../dtos/UpdateCodelabProgressDto';

@Injectable({
  providedIn: 'root'
})
export class CodelabService {

  private _url: string;
  private tempCourseId: number = 1;

  constructor(private http: HttpClient) {
    this._url = `${environment.backendUrl}/codelab`;
  }

  createCodelab(createCodelabDto: CreateCodelabDto): Observable<CodelabDto> {
    return this.http.post<CodelabDto>(this._url, createCodelabDto);
  }

  getCodelabs() {
    return this.http.get<CodelabProgressDto[]>(this._url + '/progress?courseId=' + this.tempCourseId)
  }

  updateProgress(updateCodelabProgressDto: UpdateCodelabProgressDto): Observable<void> {
    return this.http.post<void>(this._url + '/progress', updateCodelabProgressDto);
  }

}
