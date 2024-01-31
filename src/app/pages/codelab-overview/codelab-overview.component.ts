import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf} from "@angular/common";
import {MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";
import {CodelabService} from "../../services/codelab.service";
import {CodelabProgressDto} from "../../dtos/CodelabProgressDto";
import { ButtonComponent } from '../../components/button/button.component';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ProgressDto } from '../../dtos/ProgressDto';
import { ProgressService } from '../../services/progress.service';
import {CodelabDto} from "../../dtos/CodelabDto";
import {CodelabWithProgressDto} from "../../dtos/CodelabWithProgressDto";

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
  private _codelabs: CodelabWithProgressDto[] = [];
  displayedColumns: string[] = ['id', 'name', 'progress', 'details'];
  private codelabService : CodelabService = inject(CodelabService);
  private progressService: ProgressService = inject(ProgressService);
  btn_codelab_details: string = "Codelab Details";
  private _progressOptions: ProgressDto[] = [];
  private _route: ActivatedRoute = inject(ActivatedRoute);
  private _moduleId: number;

  ngOnInit() {
    const moduleId = this._route.snapshot.queryParamMap.get('moduleId');
    if (moduleId !== null) {
      this._moduleId = parseInt(moduleId);
    }
    this.getCodelabs();

    this.getProgressOptions();
  }

  private getCodelabs() {
    this.codelabService.getCodelabs(this._moduleId).subscribe({
      next: (codelabs) => {
        this.codelabService.getCodelabProgresses(this._moduleId).subscribe({
          next: (codelabProgresses) => {
            for (const codelab of codelabs) {
              const codelabWithProgressDto: CodelabWithProgressDto = {
                id: codelab.id,
                name: codelab.name,
                progress: this.getCodelabProgress(codelab, codelabProgresses)
              }

              this._codelabs.push(codelabWithProgressDto);
            }
          }
        });
      }
    });

  }

  private getCodelabProgress(codelab: CodelabDto, codelabProgresses: CodelabProgressDto[]) {
    for (const codelabProgress of codelabProgresses) {
      if (codelabProgress.codelab.id === codelab.id) {
        return codelabProgress.progress;
      }
    }

    return {
      id: 1,
      name: 'NOT_STARTED'
    }
  }

  get codelabs(): CodelabWithProgressDto[] {
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
