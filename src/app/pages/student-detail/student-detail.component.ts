import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {ButtonComponent} from "../../components/button/button.component";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatDividerModule} from "@angular/material/divider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";
import {MatOptionModule} from "@angular/material/core";
import {MatTableModule} from "@angular/material/table";
import {ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, Params} from "@angular/router";
import {UserService} from "../../services/user.service";
import {StudentWithCoursesDto} from "../../dtos/StudentWithCoursesDto";

@Component({
  selector: 'app-student-detail',
  standalone: true,
  imports: [
    AsyncPipe,
    ButtonComponent,
    MatAutocompleteModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatOptionModule,
    MatTableModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.css'
})
export class
StudentDetailComponent implements OnInit{

  private _activeRoute: ActivatedRoute = inject(ActivatedRoute);
  private _userService: UserService = inject(UserService);
  private _currentStudentId: number;

  private _studentWithCoursesDto: StudentWithCoursesDto;

  ngOnInit(): void {
    this._activeRoute.params.subscribe(
      (params: Params) => {
        this._currentStudentId += params["id"]
      });
    this._userService.getStudentById(this._currentStudentId).pipe().subscribe({
      next:(student) => {
        this._studentWithCoursesDto = student;
      }
    })
  }

}
