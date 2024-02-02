import {Component, inject} from '@angular/core';
import {UserService} from "../../services/user.service";
import {ClassGroupService} from "../../services/class-group.service";

@Component({
  selector: 'app-student-detail',
  standalone: true,
  imports: [],
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.css'
})
export class StudentDetailComponent {
  private _userService: UserService = inject(UserService);
  private _classGroupService: ClassGroupService = inject(ClassGroupService);


}
