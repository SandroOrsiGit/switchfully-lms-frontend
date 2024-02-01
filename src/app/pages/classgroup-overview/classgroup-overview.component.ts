import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe, CommonModule} from "@angular/common";
import {ActivatedRoute, Params, RouterLink} from "@angular/router";
import {MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";
import {ButtonComponent} from "../../components/button/button.component";
import {ClassGroupService} from "../../services/class-group.service";
import {UserService} from "../../services/user.service";
import {ClassGroupOverviewDto} from "../../dtos/ClassGroupOverviewDto";

@Component({
  selector: 'app-classgroup-overview',
  standalone: true,
  imports: [CommonModule,
    RouterLink,
    MatTableModule,
    MatCardModule,
    ButtonComponent,
    AsyncPipe
  ],
  templateUrl: './classgroup-overview.component.html',
  styleUrl: './classgroup-overview.component.css'
})
export class ClassgroupOverviewComponent implements OnInit{
  private classGroupService: ClassGroupService = inject(ClassGroupService);
  private activeRoute: ActivatedRoute = inject(ActivatedRoute);
  private userService: UserService = inject(UserService);

  private _classGroups: ClassGroupOverviewDto[];

  displayedColumns: string[] = ['name', 'start-date', 'end-date']
    ngOnInit() {
    this.classGroupService.getAllClassGroups().pipe().subscribe({
      next: (classGroups: ClassGroupOverviewDto[]) => {
        this._classGroups = classGroups;
      }
    })
  }

  get classGroups(): ClassGroupOverviewDto[] {
    return this._classGroups;
  }
}
