import {Component, inject, OnInit} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {CodelabService} from "../../services/codelab.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ButtonComponent} from "../../components/button/button.component";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ModuleDto} from "../../dtos/ModuleDto";
import {ModuleService} from "../../services/module.service";
import {MatSelectModule} from "@angular/material/select";
import {Location} from "@angular/common";

@Component({
  selector: 'app-create-codelab',
  standalone: true,
  imports: [
    MatCardModule,
    ButtonComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  templateUrl: './create-codelab.component.html',
  styleUrl: './create-codelab.component.css'
})
export class CreateCodelabComponent implements OnInit {
  private _snackBar = inject(MatSnackBar);
  private _modules: ModuleDto[] = [];
  private _moduleService: ModuleService = inject(ModuleService);
  private _codelabService: CodelabService = inject(CodelabService);
  private _route: ActivatedRoute = inject(ActivatedRoute);
  private _location: Location = inject(Location);


  name = new FormControl(null, [Validators.required]);
  moduleId: FormControl<number | null> = new FormControl(null, [Validators.required]);

  createCodelabForm = new FormGroup({
    name: this.name,
    moduleId: this.moduleId
  });

  onCreate() {
    this._codelabService.createCodelab({name: this.name.value!, moduleId: this.moduleId.value!}).subscribe(
      {
        next: () => {
          this._location.back();
        },
        error: () => {
          this._snackBar.open('Only coaches can created a codelab', 'Close', {
            duration: 1000
          })
        }
      }
    );
  }

  private getAllModules() {
    this._moduleService.getAllModules().subscribe(
      {
        next: modules => this._modules = modules
      });
  }

  get modules(): ModuleDto[] {
    return this._modules;
  }

  ngOnInit() {

    const moduleIdInUrl = this._route.snapshot.queryParamMap.get('moduleId');

    this.getAllModules();

    if (moduleIdInUrl) {
      this.moduleId.setValue(parseInt(moduleIdInUrl));
    }

  }
}
