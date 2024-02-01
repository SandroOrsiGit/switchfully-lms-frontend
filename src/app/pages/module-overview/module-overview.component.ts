import {Component, inject, OnInit} from '@angular/core';
import {ModuleService} from "../../services/module.service";
import {ModuleDto} from "../../dtos/ModuleDto";
import {AsyncPipe, NgForOf} from "@angular/common";
import {MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-module-overview',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe,
    MatTableModule,
    MatCardModule
  ],
  templateUrl: './module-overview.component.html',
  styleUrl: './module-overview.component.css'
})
export class ModuleOverviewComponent implements OnInit {
  private _modules: ModuleDto[] = [];
  private _moduleService: ModuleService = inject(ModuleService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  displayedColumns: string[] = ['id', 'name'];
  courseId: number;

  ngOnInit() {
    this.getCourseId();
    this.getModules();
  }

  private getModules() {
    this._moduleService.getModules(this.courseId).subscribe(
      {
        next: modules => this._modules = modules,
      }
    );
  }

  private getCourseId() {
    this.route.params.subscribe(params => {
      const courseId = params['courseId'];
      this.courseId = courseId;
    });
  }

  get modules(): ModuleDto[] {
    return this._modules;
  }

}
