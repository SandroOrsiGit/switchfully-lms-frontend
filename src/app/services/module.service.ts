import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {CreateModuleDto} from "../dtos/CreateModuleDto";
import {Observable} from "rxjs";
import {ModuleDto} from "../dtos/ModuleDto";
import {UpdateModuleDto} from "../dtos/UpdateModuleDto";

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

  getModule(moduleId: number): Observable<ModuleDto> {
    return this.http.get<ModuleDto>(`${this._url}/${moduleId}`);
  }

  getModules(courseId: number): Observable<ModuleDto[]> {
    return this.http.get<ModuleDto[]>(`${this._url}/course/${courseId}`);
  }

  getAllModules(): Observable<ModuleDto[]> {
    return this.http.get<ModuleDto[]>(this._url);
  }

  getModuleByCodelabId(codelabId: number): Observable<ModuleDto> {
    return this.http.get<ModuleDto>(`${this._url}/codelab/${codelabId}`);
  }

  editModule(moduleId: number, updateModuleDto: UpdateModuleDto): Observable<ModuleDto> {
    return this.http.put<ModuleDto>(`${this._url}/${moduleId}`, updateModuleDto);
  }
}
