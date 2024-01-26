import { Component, OnInit, inject } from '@angular/core';
import { ClassGroupService } from '../../services/class-group.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ClassGroup } from '../../models/ClassGroup';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-classgroup-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './classgroup-overview.component.html',
  styleUrl: './classgroup-overview.component.css'
})
export class ClassgroupOverviewComponent implements
  OnInit {

  private classGroupService: ClassGroupService = inject(ClassGroupService);
  private activeRoute: ActivatedRoute = inject(ActivatedRoute);
  private id: number = 0;
  public classGroup: ClassGroup;

  ngOnInit(): void {
    this.activeRoute.params.subscribe(
      (params: Params) => { this.id = +params["id"] });
    this.classGroupService.getClassGroupByClassGroupId(this.id).pipe().subscribe({
      next: (classGroup) => {
        this.classGroup = classGroup;
      }
    })
  }
}
