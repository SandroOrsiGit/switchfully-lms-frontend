import { Component } from '@angular/core';
import {ButtonComponent} from "../../components/button/button.component";
import {MatCardModule} from "@angular/material/card";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ButtonComponent,
    MatCardModule,
    RouterLink,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  btn_create_classgroup: string = "Create ClassGroup";
  btn_create_course: string = "Create Course";
  btn_create_module: string = "Create Module";
  // btn_create_subModule: string = "Create SubModule";
  btn_create_codelab: string = "Create CodeLab";

}
