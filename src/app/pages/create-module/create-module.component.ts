import {Component, inject} from '@angular/core';
import {Router} from "@angular/router";
import {MatCardModule} from "@angular/material/card";
import {ModuleService} from "../../services/module.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ButtonComponent} from "../../components/button/button.component";
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-create-module',
  standalone: true,
  imports: [
    MatCardModule,
    ButtonComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-module.component.html',
  styleUrl: './create-module.component.css'
})
export class CreateModuleComponent {
  private router = inject(Router);
  private _snackBar = inject(MatSnackBar);

  name = new FormControl('test', [Validators.required]);

  private moduleService:ModuleService = inject(ModuleService);

  getNameErrorMessage() {
    return 'You must enter a value';
  }

  onCreate() {
    this.moduleService.createModule({name: this.name.value!}).subscribe(
      {
        next: () => {
          this.router.navigate(['/profile']);
        },
        error: () => {
          this._snackBar.open('Only coaches can created a module','Close');
        }
      }
    );
  }


}
