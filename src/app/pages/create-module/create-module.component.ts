import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {LoginFormComponent} from "../../components/login-form/login-form.component";
import {MatCardModule} from "@angular/material/card";
import {CreateModuleFormComponent} from "../../components/create-module-form/create-module-form.component";
import {ModuleService} from "../../services/module.service";
import {CreateModuleDto} from "../../dto/CreateModuleDto";

@Component({
  selector: 'app-create-module',
  standalone: true,
  imports: [
    LoginFormComponent,
    MatCardModule,
    CreateModuleFormComponent
  ],
  templateUrl: './create-module.component.html',
  styleUrl: './create-module.component.css'
})
export class CreateModuleComponent {

  constructor(private moduleService: ModuleService) {}

  onCreate(createModuleDto: CreateModuleDto) {
    console.log('CreateModuleComponent.onCreate');
    console.log(createModuleDto);

    this.moduleService.createModule(createModuleDto).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }


}