import {inject, Injectable} from '@angular/core';
import {CreateCommentDto} from '../dtos/CreateCommentDto';
import {environment} from '../../environments/environment.dev';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private _url: string;
  private http = inject(HttpClient);

  constructor() {
    this._url = `${environment.backendUrl}/comments`;
  }

  createComment(createCommentDto: CreateCommentDto) {
    return this.http.post<CreateCommentDto>(`${this._url}`, createCommentDto)
  }
}
