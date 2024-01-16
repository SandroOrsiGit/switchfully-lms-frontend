import { Component, Input } from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    MatButtonModule, MatDividerModule, MatIconModule
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() buttonText: string = 'Button';
}
