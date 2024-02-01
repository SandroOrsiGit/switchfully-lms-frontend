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
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
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

  private classGroupService: ClassGroupService = inject(ClassGroupService);
  private activeRoute: ActivatedRoute = inject(ActivatedRoute);
  private userService: UserService = inject(UserService);

  displayedColumns: string[] = ['name', 'e-mail', 'view-details'];

  private id: number = 0;
  private _classGroup: ClassGroup;
  private _options: StudentDto[] = [];
  myControl = new FormControl('');
  btn_add_student: string = "Add To Classgroup";

  filteredOptions: Observable<StudentDto[]>;

  public loggedInUser: User | undefined;
  btn_view_details: string = "View details";

  ngOnInit(): void {
    this.activeRoute.params.subscribe(
      (params: Params) => {
        this.id += params["id"]
      });
    this.classGroupService.getClassGroupByClassGroupId(this.id).pipe().subscribe({
      next: (classGroup) => {
        this._classGroup = classGroup;
      }
    })

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.getStudents();

    this.loggedInUser = this.userService.getCurrentUser();
  }

  isCoach(): boolean {
    return this.loggedInUser?.role === 'coach';
  }

  addStudent() {
  }

  private getStudents() {
    this.userService.getAllStudents().subscribe(
      {
        next: studentDtoList => {
          this._options = studentDtoList
          console.log(this._options)
        },
        error: error => {
          console.error(error)
        }
      }
    )
  }

  private _filter(value: string): StudentDto[] {
    const filterValue = value.toLowerCase();
    return this._options.filter(option => option.displayName.toLowerCase().includes(filterValue));
  }
  get classGroup(): ClassGroup {
    return this._classGroup;
  }

  get options(): StudentDto[] {
    return this._options;
  }
}
