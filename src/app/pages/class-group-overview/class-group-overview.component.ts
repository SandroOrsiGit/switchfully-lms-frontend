import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe, CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";
import {MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";
import {ButtonComponent} from "../../components/button/button.component";
import {ClassGroupService} from "../../services/class-group.service";
import {UserService} from "../../services/user.service";
import {ClassGroupOverviewDto} from "../../dtos/ClassGroupOverviewDto";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-classgroup-overview',
  standalone: true,
  imports: [CommonModule,
    RouterLink,
    MatTableModule,
    MatCardModule,
    ButtonComponent,
    AsyncPipe, MatProgressSpinnerModule
  ],
  templateUrl: './class-group-overview.component.html',
  styleUrl: './class-group-overview.component.css'
})
export class ClassGroupOverviewComponent implements OnInit{
  private _classGroupService: ClassGroupService = inject(ClassGroupService);
  private _userService: UserService = inject(UserService);

  private _classGroups: ClassGroupOverviewDto[] = [];
  loading: boolean = true;

  displayedColumns: string[] = ['name', 'start-date', 'end-date', 'actions'];
  btn_class_group_details: string = "Class Members"

  ngOnInit() {
    if (this._userService.getCurrentUser()?.role === 'coach') {
      this._classGroupService.getAllClassGroups().pipe().subscribe({
        next: (classGroups: ClassGroupOverviewDto[]) => {
          this._classGroups = classGroups;
          this.finishLoading();
        }
      })
    } else {
      this._classGroupService.getClassGroupsByUserId(this._userService.getCurrentUser()?.id).pipe().subscribe({
        next: (classGroups: ClassGroupOverviewDto[]) => {
          this._classGroups = classGroups;
          this.finishLoading();
        }
      })
    }
  }

  get classGroups(): ClassGroupOverviewDto[] {
    return this._classGroups;
  }

  finishLoading() {
    this.loading = false;
  }
}
