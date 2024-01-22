import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassGroupService {

  constructor() { }

  getClassGroups(): string[]  {
    return ["Java", ".NET", "Testers"]
}
}
