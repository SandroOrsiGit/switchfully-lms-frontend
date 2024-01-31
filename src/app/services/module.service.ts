import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {CreateModuleDto} from "../dtos/CreateModuleDto";
import {Observable} from "rxjs";
import {ModuleDto} from "../dtos/ModuleDto";

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  private _url: string;

  constructor(private http: HttpClient) {
    this._url = `${environment.backendUrl}/modules`;
  }

  createModule(createModuleDto: CreateModuleDto): Observable<ModuleDto> {
    return this.http.post<ModuleDto>(this._url, createModuleDto);
  }

  getModules(courseId: number): Observable<ModuleDto[]> {
    return this.http.get<ModuleDto[]>(`${this._url}/${courseId}`);
  }

}
