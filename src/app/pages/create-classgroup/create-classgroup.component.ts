import {Component, OnInit} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ButtonComponent} from "../../components/button/button.component";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-create-classgroup',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ButtonComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './create-classgroup.component.html',
  styleUrl: './create-classgroup.component.css'
})
export class CreateClassgroupComponent implements OnInit{
  buttonName = '';

  ngOnInit(): void {
    this.buttonName = 'Sumbit';
  }

  onSubmit() {
    console.log("submit button clicked")
  }
}
