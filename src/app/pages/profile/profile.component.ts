import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Observable} from 'rxjs';
import {ClassGroupService} from '../../services/class-group.service';
import {User} from '../../model/user';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  classGroupService = inject(ClassGroupService);
  editing: boolean = false;
  user$: User = {displayName: 'test',
    email: 'test@test',
    classes: ['Java', '.NET']};

  constructor() {
  }

  ngOnInit() {

  }

  toggleEditing(): void {
    this.editing = !this.editing;
  }
}
