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

    this.loggedInUser = this.userService.getCurrentUser();
  }

  isCoach(): boolean {
    return this.loggedInUser?.role === 'coach';
  }


  get classGroup(): ClassGroup {
    return this._classGroup;
  }
}
