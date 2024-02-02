import {Component, OnInit} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";

@Component({
  selector: 'app-student-overview',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule
  ],
  templateUrl: './student-overview.component.html',
  styleUrl: './student-overview.component.css'
})
export class StudentOverviewComponent implements OnInit {
  // private currentStudent: StudentDto | undefined;
  // private userService: UserService = inject(UserService);
  // private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  // displayedColumns: string[] = ['name', 'email', 'current classgroup', 'placeholder progress'];
  // studentId: string;

  ngOnInit(): void {
    // this.activatedRoute.params.subscribe((params: Params) => {
    //   this.studentId = params['id'],
    //     this.getStudent()
    // });
  }

  // getStudent(): void {
  //   this.userService.getStudentById(this.studentId).subscribe(
  //     (student: StudentDto) => {
  //       this.currentStudent = student;
  //     },
  //     (error: any) => {
  //       console.error('Error fetching student details', error);
  //     }
  //   );
  // }


}
