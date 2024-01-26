import {Component, inject, OnInit} from '@angular/core';
import {ModuleService} from "../../services/module.service";
import {ModuleDto} from "../../dtos/ModuleDto";
import {AsyncPipe, NgForOf} from "@angular/common";
import {MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";

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
  private _modules:any = [];
  private moduleService: ModuleService = inject(ModuleService);
  displayedColumns: string[] = ['id', 'name'];
  ngOnInit() {
    this.getModules()
  }

  private getModules() {
    this.moduleService.getModules().subscribe( {
      next: modules => this._modules = modules
      // ,complete: () => console.log(this._modules)
    } );

    // this.moduleService.getModules().subscribe( modules => console.log(modules) );
  }


  get modules(): ModuleDto[] {
    return this._modules;
  }

}
