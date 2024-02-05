import {Component, inject, OnInit} from '@angular/core';
import {CodelabService} from "../../services/codelab.service";
import {ActivatedRoute} from "@angular/router";
import {CodelabDto} from "../../dtos/CodelabDto";
import {ButtonComponent} from "../../components/button/button.component";
import {FormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {AsyncPipe, NgIf} from "@angular/common";
import {CommentDto} from "../../dtos/CommentDto";

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
    AsyncPipe
  ],
  templateUrl: './codelab-detail.component.html',
  styleUrl: './codelab-detail.component.css'
})

export class CodelabDetailComponent implements OnInit{
  private _codelabService: CodelabService = inject(CodelabService);
  private _route: ActivatedRoute = inject(ActivatedRoute);
  private _codelab: CodelabDto;
  private _dataSource = new MatTableDataSource<CommentDto>();
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
