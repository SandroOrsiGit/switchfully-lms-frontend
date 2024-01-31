import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf} from "@angular/common";
import {MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";
import {CodelabService} from "../../services/codelab.service";
import {CodelabProgressDto} from "../../dtos/CodelabProgressDto";
import { ButtonComponent } from '../../components/button/button.component';
import { RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ProgressDto } from '../../dtos/ProgressDto';
import { ProgressService } from '../../services/progress.service';

@Component({
  selector: 'app-codelab',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe,
    MatTableModule,
    MatCardModule,
    ButtonComponent,
    RouterLink,
    MatFormFieldModule,
    MatSelectModule,
    NgForOf
  ],
  templateUrl: './codelab-overview.component.html',
  styleUrl: './codelab-overview.component.css'
})
export class CodelabOverviewComponent implements OnInit {
  private _codelabs: CodelabProgressDto[] = [];
  displayedColumns: string[] = ['id', 'codelab', 'progress', 'details'];
  private codelabService : CodelabService = inject(CodelabService);
  private progressService: ProgressService = inject(ProgressService);
  btn_codelab_details: string = "Codelab Details";
  private _progressOptions: ProgressDto[] = [];

  ngOnInit() {
    this.getCodelabs();
    this.getProgressOptions();
  }

  private getCodelabs() {
    this.codelabService.getCodelabs().subscribe({
      next: codelabs => this._codelabs = codelabs
    })
  }

  get codelabs(): CodelabProgressDto[] {
    return this._codelabs;
  }

  private getProgressOptions() {
    this.progressService.getProgressOptions().subscribe(
      {
        next: progressOptions => this._progressOptions = progressOptions,
      }
    )
  }

  get progressOptions() {
    return this._progressOptions;
  }

  updateProgress(codelabId: number, progressId: number) {
    const updateCodelabProgressDto = {
      codelabId: codelabId,
      progressId: progressId
    }
    this.codelabService.updateProgress(updateCodelabProgressDto).subscribe(
      {
        next: (succes: any) => console.error(succes),
        error: (error: any) => console.error(error)
      }
    );
  }

}
