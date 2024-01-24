import { Component, inject } from '@angular/core';
import { CreateCodelabFormComponent } from "../../components/create-codelab-form/create-codelab-form.component";
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CreateModuleDto } from '../../dtos/CreateModuleDto';
import { CodelabService } from '../../services/codelab.service';
import { CreateCodelabDto } from '../../dtos/CreateCodelabDto';

@Component({
    selector: 'app-create-codelab',
    standalone: true,
    templateUrl: './create-codelab.component.html',
    styleUrl: './create-codelab.component.css',
    imports: [
        CreateCodelabFormComponent,
        MatCardModule,
    ]
})
export class CreateCodelabComponent {
    private router = inject(Router);
    private _snackBar = inject(MatSnackBar);
    private codelabService: CodelabService = inject(CodelabService);
  
    onCreate(createCodelabDto: CreateCodelabDto) {
      this.codelabService.createCodelab(createCodelabDto).subscribe(
        {
          next: () => {
            this.router.navigate(['/profile']);
          },
          error: () => {
            this._snackBar.open('Only coaches can created a codelab','Close');
          }
        }
      );
    }
}
