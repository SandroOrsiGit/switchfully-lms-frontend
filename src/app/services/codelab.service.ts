import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {Observable} from "rxjs";
import { CreateCodelabDto } from '../dtos/CreateCodelabDto';
import { CodelabDto } from '../dtos/CodelabDto';
import {CodelabProgressDto} from "../dtos/CodelabProgressDto";
import { UpdateCodelabProgressDto } from '../dtos/UpdateCodelabProgressDto';
import {CodelabWithProgressDto} from "../dtos/CodelabWithProgressDto";

@Injectable({
  providedIn: 'root'
})
export class CodelabService {
  private _url: string;

  constructor(private http: HttpClient) {
    this._url = `${environment.backendUrl}/codelab`;
  }

  createCodelab(createCodelabDto: CreateCodelabDto): Observable<CodelabDto> {
    return this.http.post<CodelabDto>(this._url, createCodelabDto);
  }

  getCodelabsWithProgress(moduleId: number): Observable<CodelabWithProgressDto[]> {
    return this.http.get<CodelabWithProgressDto[]>(`${this._url}?moduleId=${moduleId}`)
  }

  getCodelabs(moduleId: number): Observable<CodelabDto[]> {
    return this.http.get<CodelabDto[]>(`${this._url}?moduleId=${moduleId}`)
  }

  getCodelabProgresses(moduleId: number): Observable<CodelabProgressDto[]> {
    return this.http.get<CodelabProgressDto[]>(`${this._url}/progress?moduleId=${moduleId}`)
  }

  updateProgress(updateCodelabProgressDto: UpdateCodelabProgressDto): Observable<void> {
    return this.http.post<void>(this._url + '/progress', updateCodelabProgressDto);
  }

}
