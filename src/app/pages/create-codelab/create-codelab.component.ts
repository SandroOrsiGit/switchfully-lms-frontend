import {Component, inject} from '@angular/core';
import {Router} from "@angular/router";
import {MatCardModule} from "@angular/material/card";
import {CodelabService} from "../../services/codelab.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ButtonComponent} from "../../components/button/button.component";
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-create-codelab',
  standalone: true,
  imports: [
      MatCardModule,
      ButtonComponent,
      FormsModule,
      MatFormFieldModule,
      MatInputModule,
      ReactiveFormsModule
  ],
  templateUrl: './create-codelab.component.html',
  styleUrl: './create-codelab.component.css'
})
export class CreateCodelabComponent {
  private router = inject(Router);
  private _snackBar = inject(MatSnackBar);

  name = new FormControl('test', [Validators.required]);

  constructor(private codelabService: CodelabService) {}

  getNameErrorMessage() {
    return 'You must enter a value';
  }

  onCreate() {
    this.codelabService.createCodelab({name: this.name.value!}).subscribe(
      {
        next: () => {
          this.router.navigate(['/profile']);
        },
        error: () => {
          this._snackBar.open('Only coaches can created a codelab','Close', {
            duration: 1000
          })
        }
      }
    );
  }


}
