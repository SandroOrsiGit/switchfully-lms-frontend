
import {Component, EventEmitter, Input, Output} from '@angular/core';

import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";

@Component({
  selector: 'app-button',
  standalone: true,
  inputs: ['buttonName'],
  imports: [
    MatButtonModule, MatDividerModule, MatIconModule
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {

  @Input() buttonName: string = '';
  @Input() disabled: boolean = false;
  @Output() buttonClick = new EventEmitter<void>();

  onClick() {
    this.buttonClick.emit();
  }


}
