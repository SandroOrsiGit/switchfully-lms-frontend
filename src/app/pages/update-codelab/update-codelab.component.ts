import { Component } from '@angular/core';
import {ButtonComponent} from "../../components/button/button.component";
import {FormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";

@Component({
  selector: 'app-update-codelab',
  standalone: true,
    imports: [
        ButtonComponent,
        FormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule
    ],
  templateUrl: './update-codelab.component.html',
  styleUrl: './update-codelab.component.css'
})
export class UpdateCodelabComponent {

}
