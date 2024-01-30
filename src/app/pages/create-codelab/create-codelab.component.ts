import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
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
  private router = inject(Router);
  private _snackBar = inject(MatSnackBar);
  private _modules: ModuleDto[] = []
  private _moduleService: ModuleService = inject(ModuleService);
  private _codelabService: CodelabService = inject(CodelabService);
  private _route: ActivatedRoute = inject(ActivatedRoute);

  name = new FormControl('test', [Validators.required]);
  moduleIds: FormControl<number[] | null> = new FormControl([], [Validators.required]);

  createCodelabForm = new FormGroup( {
    name: this.name,
    moduleIds: this.moduleIds
  });

  onCreate() {
    this._codelabService.createCodelab({name: this.name.value!, moduleIds: this.moduleIds.value!}).subscribe(
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

  private getModules() {
    // this._moduleService.getModules().subscribe({
    //   next: modules => this._modules = modules
    // });
  }


  get modules(): ModuleDto[] {
    return this._modules;
  }

  ngOnInit() {
    this.getModules();
  }


}
