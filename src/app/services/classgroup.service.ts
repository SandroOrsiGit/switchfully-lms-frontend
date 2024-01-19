import {inject, Injectable} from '@angular/core';
import {Classgroup} from "../model/Classgroup";
import {environment} from "../../environments/environments";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ClassgroupService {
  private readonly url: string  = `${environment.backendUrl}/classgroup`

  private http: HttpClient = inject(HttpClient);
  constructor() { }

  createClassgroup(newClassgroup: Classgroup) {
      return this.http.post<Classgroup>(this.url, newClassgroup);
  }
}
