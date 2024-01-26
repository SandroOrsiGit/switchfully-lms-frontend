import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {Observable} from "rxjs";
import { CreateCodelabDto } from '../dtos/CreateCodelabDto';
import { CodelabDto } from '../dtos/CodelabDto';

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
  
}
