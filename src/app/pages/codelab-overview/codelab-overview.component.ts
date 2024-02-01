import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf} from "@angular/common";
import {MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";
import {CodelabService} from "../../services/codelab.service";
import { ButtonComponent } from '../../components/button/button.component';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ProgressDto } from '../../dtos/ProgressDto';
import { ProgressService } from '../../services/progress.service';
import {CodelabWithProgressDto} from "../../dtos/CodelabWithProgressDto";
import { MatSnackBar } from '@angular/material/snack-bar';

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
  private _snackBar = inject(MatSnackBar);


  ngOnInit() {
    const moduleId = this._route.snapshot.queryParamMap.get('moduleId');
    if (moduleId !== null) {
      this._moduleId = parseInt(moduleId);
    }
    this.getCodelabs();

    this.getProgressOptions();
  }

  private getCodelabs() {
    this.codelabService.getCodelabsWithProgress(this._moduleId).subscribe({
      next: codelabsWithProgress => this._codelabs = codelabsWithProgress
    });
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
        next: () => {
          this._snackBar.open('Progress saved', 'Close', {
            duration: 1000
          });
        },
        error: () => {
          this._snackBar.open('Something went wrong', 'Close', {
            duration: 1000
          });
        }
      }
    );
  }

}
