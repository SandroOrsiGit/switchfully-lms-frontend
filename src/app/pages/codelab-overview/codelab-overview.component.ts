import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf} from "@angular/common";
import {MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";
import {CodelabService} from "../../services/codelab.service";
import {ButtonComponent} from '../../components/button/button.component';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {ProgressDto} from '../../dtos/ProgressDto';
import {ProgressService} from '../../services/progress.service';
import {CodelabWithProgressDto} from "../../dtos/CodelabWithProgressDto";
import {MatSnackBar} from '@angular/material/snack-bar';
import {CodelabDto} from "../../dtos/CodelabDto";
import {UserService} from "../../services/user.service";

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

  // Services
  private codelabService: CodelabService = inject(CodelabService);
  private progressService: ProgressService = inject(ProgressService);
  private _userService = inject(UserService);
  private _route: ActivatedRoute = inject(ActivatedRoute);

  // Html attributes
  displayedColumns: string[];
  displayedColumnsStudent: string[] = ['name', 'progress', 'actions'];
  displayedColumnsCoach: string[] = ['name', 'actions'];
  btn_codelab_details: string = "Codelab Details";
  btn_edit_codelab: string = "Edit Codelab";
  private _snackBar = inject(MatSnackBar);

  // Data from backend
  codelabDataSource: any[] = [];
  private _codelabsWithProgress: CodelabWithProgressDto[] = [];
  private _codelabs: CodelabDto[] = [];
  private _progressOptions: ProgressDto[] = [];

  private _moduleId: number;

  ngOnInit() {
    if(this._route.snapshot.queryParamMap.get('moduleId') !== null) {
      this._moduleId = parseInt(this._route.snapshot.queryParamMap.get('moduleId')!);
    }

    if (this._userService.isCoach()) {
      this.setCoachSettings();
    } else {
      this.setStudentSettings();
    }

    this.getProgressOptions();

  }

  setCoachSettings() {
    this.getCodelabs();
  }

  setStudentSettings() {
    this.getCodelabsWithProgress();
  }

  getCodelabs() {
    this.codelabService.getCodelabsByModuleId(this._moduleId).subscribe({
      next: (codelabs) => {
        this._codelabs = codelabs;
        this.codelabDataSource = this._codelabs;
        this.displayedColumns = this.displayedColumnsCoach;
      },
    });
  }

  private getCodelabsWithProgress() {
    this.codelabService.getCodelabsWithProgressByModuleId(this._moduleId).subscribe({
      next: (codelabsWithProgress) => {
        this._codelabsWithProgress = codelabsWithProgress;
        this.codelabDataSource = this._codelabsWithProgress;
        this.displayedColumns = this.displayedColumnsStudent;
      }
    });
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

  isStudent() {
    return this._userService.isStudent();
  }

  isCoach() {
    return this._userService.isCoach();
  }

}
