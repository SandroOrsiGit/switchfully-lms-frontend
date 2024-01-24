import {Component, inject} from '@angular/core';
import {Router} from "@angular/router";
import {MatCardModule} from "@angular/material/card";
import {CreateModuleFormComponent} from "../../components/create-module-form/create-module-form.component";
import {ModuleService} from "../../services/module.service";
import {CreateModuleDto} from "../../dtos/CreateModuleDto";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-create-module',
  standalone: true,
  imports: [
    MatCardModule,
    CreateModuleFormComponent
  ],
  templateUrl: './create-module.component.html',
  styleUrl: './create-module.component.css'
})
export class CreateModuleComponent {
  private router = inject(Router);
  private _snackBar = inject(MatSnackBar);

  private moduleService:ModuleService = inject(ModuleService);

  onCreate(createModuleDto: CreateModuleDto) {
    this.moduleService.createModule(createModuleDto).subscribe(
      {
        next: _ => {
          this.router.navigate(['/profile']);
        },
        error: _ => {
          this._snackBar.open('Only coaches can created a module','Close');
        }
      }
    );
  }


}
