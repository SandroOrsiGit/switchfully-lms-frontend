import {Component, OnInit, inject} from '@angular/core';
import {ClassGroupService} from '../../services/class-group.service';
import {ActivatedRoute, Params, RouterLink} from '@angular/router';
import {ClassGroup} from '../../models/ClassGroup';
import {AsyncPipe, CommonModule} from '@angular/common';
import {UserService} from "../../services/user.service";
import {User} from "../../models/User";
import {MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";
import {ButtonComponent} from "../../components/button/button.component";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {StudentDto} from "../../dtos/StudentDto";
import {map, Observable, startWith} from "rxjs";

@Component({
  selector: 'app-classgroup-overview',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    MatTableModule,
    MatCardModule,
    ButtonComponent,
    AsyncPipe,
    MatInputModule,
    MatAutocompleteModule
  ],
  templateUrl: './classgroup-detail.component.html',
  styleUrl: './classgroup-detail.component.css'
})
export class ClassgroupDetailComponent implements OnInit {

  private _classGroupService: ClassGroupService = inject(ClassGroupService);
  private _activeRoute: ActivatedRoute = inject(ActivatedRoute);
  private _userService: UserService = inject(UserService);

  displayedColumns: string[] = ['name', 'e-mail', 'view-details'];

  private id: number = 0;
  private _classGroup: ClassGroup;
  private _studentDtoList: StudentDto[] = [];
  studentListAutoComplete = new FormControl('');
  addStudentForm = new FormGroup({
    studentListAutoComplete: this.studentListAutoComplete
  })
  btn_add_student: string = "Add To Classgroup";

  filteredOptions: Observable<StudentDto[]>;

  public loggedInUser: User | undefined;
  btn_view_details: string = "View details";

  ngOnInit(): void {
    this._activeRoute.params.subscribe(
      (params: Params) => {
        this.id += params["id"]
      });
    this._classGroupService.getClassGroupByClassGroupId(this.id).pipe().subscribe({
      next: (classGroup) => {
        this._classGroup = classGroup;
      }
    })

    this.filteredOptions = this.studentListAutoComplete.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.getStudents();

    this.loggedInUser = this._userService.getCurrentUser();
  }

  isCoach(): boolean {
    return this.loggedInUser?.role === 'coach';
  }

  addStudent() {
    // console.log(this.studentListAutoComplete.getRawValue())

  }

  private getStudents() {
    this._userService.getAllStudents().subscribe(
      {
        next: studentDtoList => {
          this._studentDtoList = studentDtoList
        },
        error: error => {
          console.error(error)
        }
      }
    )
  }


  private _filter(value: string): StudentDto[] {
    if (!this._studentDtoList) {
      return [];
    }
    const filterValue = value.toLowerCase();
    return this._studentDtoList
      .filter(studentDto => studentDto.displayName.toLowerCase().includes(filterValue));
  }
  get classGroup(): ClassGroup {
    return this._classGroup;
  }

  get studentDtoList(): StudentDto[] {
    return this._studentDtoList;
  }
}
