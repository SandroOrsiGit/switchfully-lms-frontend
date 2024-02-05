import {Component, inject, OnInit} from '@angular/core';
import {ModuleService} from "../../services/module.service";
import {ModuleDto} from "../../dtos/ModuleDto";
import {AsyncPipe, NgForOf} from "@angular/common";
import {MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";
import {ActivatedRoute, RouterLink} from '@angular/router';
import {ButtonComponent} from "../../components/button/button.component";

@Component({
  selector: 'app-module-overview',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe,
    MatTableModule,
    MatCardModule,
    ButtonComponent,
    RouterLink
  ],
  templateUrl: './module-overview.component.html',
  styleUrl: './module-overview.component.css'
})
export class ModuleOverviewComponent implements OnInit {
  private _modules: ModuleDto[] = [];
  private _moduleService: ModuleService = inject(ModuleService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  displayedColumns: string[] = ['name', 'view-codelabs'];
  courseId: number;
  btn_view_codelabs: string = "View Codelabs";

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
      this.courseId = params['courseId'];
    });
  }

  get modules(): ModuleDto[] {
    return this._modules;
  }

}
