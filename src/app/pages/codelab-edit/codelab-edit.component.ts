import { Component, OnInit, inject } from '@angular/core';
import {ButtonComponent} from "../../components/button/button.component";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CodelabDto } from '../../dtos/CodelabDto';
import { CodelabService } from '../../services/codelab.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdateCodelabDto } from '../../dtos/UpdateCodelabDto';
import { ModuleService } from '../../services/module.service';
import { ModuleDto } from '../../dtos/ModuleDto';
import {Location} from "@angular/common";

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
  templateUrl: './codelab-edit.component.html',
  styleUrl: './codelab-edit.component.css'
})
export class CodelabEditComponent implements OnInit {

  private _codelabService: CodelabService = inject(CodelabService);
  private _moduleService: ModuleService = inject(ModuleService);
  private _route: ActivatedRoute = inject(ActivatedRoute);
  private _snackBar = inject(MatSnackBar);
  private _location: Location = inject(Location);

  private _codelab: CodelabDto;
  modules: ModuleDto[] = [];
  private _currentModule: ModuleDto;

  name: FormControl<string | null> = new FormControl(null, [Validators.required]);
  moduleId: FormControl<number | null> = new FormControl(null, [Validators.required]);
  editCodelabForm = new FormGroup( {
    name: this.name,
    moduleId: this.moduleId
  });

  ngOnInit(): void {
    this.getCodelab();
    this.getModules();
  }

  getCodelab() {
    this._route.params.subscribe(params => {
      const codelabId: number = params['codelabId'];
      this._codelabService.getCodelabById(codelabId).subscribe(
        {
          next: (codelab) => {
            this._codelab = codelab;
            this.name.setValue(this._codelab.name);
            this._moduleService.getModuleByCodelabId(codelab.id).subscribe(
              {
                next: (module) => {
                  this._currentModule = module;
                  this.moduleId.setValue(module.id);
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
      codelabId: this._codelab.id,
      name: this.name.value!,
      moduleId: this.moduleId.value!
    }
    return this._codelabService.editCodelab(this._codelab.id, updateCodelabDto).subscribe({
      next: () => {
        this._snackBar.open('Successfully edited codelab', 'Close', {
          duration: 1000
        });
        this._location.back();
      },
      error: () => {
        this._snackBar.open('Only coaches can edit a codelab', 'Close', {
          duration: 1000
        });
      }
    });
  }

  get codelab() {
    return this._codelab;
  }

  get currentModule() {
    return this._currentModule;
  }

}
