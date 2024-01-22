import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {CreateModuleDto} from "../dto/CreateModuleDto";
import {Observable} from "rxjs";
import {Module} from "../models/Module";

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  private _url: string;

  constructor(private http: HttpClient) {
    this._url = `${environment.backendUrl}/modules`;
  }

  createModule(createModuleDto: CreateModuleDto): Observable<Module> {
    return this.http.post(this._url, createModuleDto);
  }
}
