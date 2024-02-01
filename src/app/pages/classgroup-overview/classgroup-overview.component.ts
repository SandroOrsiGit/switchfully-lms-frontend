import {Component, OnInit, inject} from '@angular/core';
import {ClassGroupService} from '../../services/class-group.service';
import {ActivatedRoute, Params, RouterLink} from '@angular/router';
import {ClassGroup} from '../../models/ClassGroup';
import {CommonModule} from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import {UserService} from "../../services/user.service";
import {User} from "../../models/User";
import {MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";

@Component({
  selector: 'app-classgroup-overview',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, MatDividerModule, RouterLink, MatTableModule, MatCardModule],
  templateUrl: './classgroup-overview.component.html',
  styleUrl: './classgroup-overview.component.css'
})
export class ClassgroupOverviewComponent implements OnInit {

  private classGroupService: ClassGroupService = inject(ClassGroupService);
  private activeRoute: ActivatedRoute = inject(ActivatedRoute);
  private userService: UserService = inject(UserService);

  private id: number = 0;
  public classGroup: ClassGroup;
  public loggedInUser: User | undefined;
  panelOpenState = true;

  ngOnInit(): void {
    this.activeRoute.params.subscribe(
      (params: Params) => {
        this.id += params["id"]
      });
    this.classGroupService.getClassGroupByClassGroupId(this.id).pipe().subscribe({
      next: (classGroup) => {
        this.classGroup = classGroup;
      }
    })

    this.loggedInUser = this.userService.getCurrentUser();
  }

  isCoach(): boolean {
    return this.loggedInUser?.role === 'coach';
  }
}
