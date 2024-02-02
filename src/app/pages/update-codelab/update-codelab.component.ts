import { Component, OnInit, inject } from '@angular/core';
import {ButtonComponent} from "../../components/button/button.component";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CodelabDto } from '../../dtos/CodelabDto';
import { CodelabService } from '../../services/codelab.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdateCodelabDto } from '../../dtos/UpdateCodelabDto';
import { ModuleService } from '../../services/module.service';
import { ModuleDto } from '../../dtos/ModuleDto';

@Component({
  selector: 'app-update-codelab',
  standalone: true,
    imports: [
        ButtonComponent,
        FormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule,
        RouterLink,
    ],
  templateUrl: './update-codelab.component.html',
  styleUrl: './update-codelab.component.css'
})
export class UpdateCodelabComponent implements OnInit {

  private _codelabService: CodelabService = inject(CodelabService);
  private _moduleService: ModuleService = inject(ModuleService);
  private _route: ActivatedRoute = inject(ActivatedRoute);
  private _router = inject(Router);
  private _snackBar = inject(MatSnackBar);

  codelab: CodelabDto;
  modules: ModuleDto[] = [];
  currentModule: ModuleDto;

  private isFormEdited = false;
  name: FormControl<string | null> = new FormControl(null);
  moduleId: FormControl<number | null> = new FormControl(null);
  editCodelabForm = new FormGroup( {
    name: this.name,
    moduleId: this.moduleId
  });

  ngOnInit(): void {
    this.getCodelab();
    this.getModules();
    this.editCodelabForm.valueChanges.subscribe(() => {
      this.isFormEdited = true;
    });
  }

  getCodelab() {
    this._route.params.subscribe(params => {
      const codelabId: number = params['codelabId'];
      this._codelabService.getCodelabById(codelabId).subscribe(
        {
          next: (codelab) => {
            this.codelab = codelab;
            this._moduleService.getModuleByCodelabId(codelab.id).subscribe(
              {
                next: (module) => {
                  this.currentModule = module;
                } 
              }
            )
          }
        }
      );
    });
  }

  getModules() {
    this._moduleService.getAllModules().subscribe({
      next: modules => this.modules = modules,
    });
  }

  onEdit() {
    const updateCodelabDto: UpdateCodelabDto = {
      codelabId: this.codelab.id,
      name: this.name.value!,
      moduleId: this.moduleId.value!
    }
    return this._codelabService.editCodelab(this.codelab.id, updateCodelabDto).subscribe({
      next: () => {
        this._snackBar.open('Successfully edited codelab', 'Close', {
          duration: 1000
        });
        this._router.navigate(['/codelabs']);
      },
      error: () => {
        this._snackBar.open('Only coaches can edit a codelab', 'Close', {
          duration: 1000
        });
      }
    });
  }

  toggleButton(): boolean {
    return !this.isFormEdited;
  }

}
