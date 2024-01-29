import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf} from "@angular/common";
import {MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";
import {CodelabService} from "../../services/codelab.service";
import {CodelabProgressDto} from "../../dtos/CodelabProgressDto";

@Component({
  selector: 'app-codelab',
  standalone: true,
  imports: [NgForOf,
    AsyncPipe,
    MatTableModule,
    MatCardModule],
  templateUrl: './codelab-overview.component.html',
  styleUrl: './codelab-overview.component.css'
})
export class CodelabOverviewComponent implements OnInit {
  private _codelabs: CodelabProgressDto[] = [];
  displayedColumns: string[] = ['id', 'codelab', 'progress'];
  private codelabService : CodelabService = inject(CodelabService);

  ngOnInit() {
    this.getCodelabs();
  }

  private getCodelabs() {
    this.codelabService.getCodelabs().subscribe({
      next: codelabs => this._codelabs = codelabs
    })
  }

  get codelabs(): CodelabProgressDto[] {
    return this._codelabs;
  }
}
