import {Component, inject, OnInit} from '@angular/core';
import {CodelabService} from "../../services/codelab.service";
import {ActivatedRoute} from "@angular/router";
import {CodelabDto} from "../../dtos/CodelabDto";
import {ButtonComponent} from "../../components/button/button.component";
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {AsyncPipe, NgIf} from "@angular/common";
import {CommentDto} from "../../dtos/CommentDto";
import {CommentService} from '../../services/comment.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-codelab-detail',
  standalone: true,
  imports: [
    ButtonComponent,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    NgIf,
    AsyncPipe,
    ReactiveFormsModule,
  ],
  templateUrl: './codelab-detail.component.html',
  styleUrl: './codelab-detail.component.css'
})

export class CodelabDetailComponent implements OnInit{
  private _codelabService: CodelabService = inject(CodelabService);
  private _commentService: CommentService = inject(CommentService);
  private _route: ActivatedRoute = inject(ActivatedRoute);
  private _snackBar = inject(MatSnackBar)
  private _userService = inject(UserService);

  private _codelab: CodelabDto;
  private _dataSource = new MatTableDataSource<CommentDto>();
  text = new FormControl('test', [Validators.required]);
  displayedColumns: string[] = ['name', 'comments'];

  ngOnInit() {
    this.getCodelab();
  }
  get codelab(): CodelabDto {
    return this._codelab;
  }

  get dataSource() {
    return this._dataSource;
  }

  isStudent() {
    return this._userService.isStudent();
  }

  onCreate() {
    this._commentService.createComment({text: this.text.value!, codelabId: this._codelab.id}).subscribe(
      {
        next: () => {
          this._snackBar.open('Comment added','Close', {
            duration: 1000
          })
          this.getCodelab();
    }
      }
    )
  }

  private getCodelab() {
    this._route.params.subscribe(params => {
      const codelabId = params['codelabId'];

      this._codelabService.getCodelabById(codelabId).subscribe({
        next: codelabDto => {
          this._codelab = codelabDto;
          this._dataSource.data = codelabDto.comments;
        }
      })
    });
  }
}
