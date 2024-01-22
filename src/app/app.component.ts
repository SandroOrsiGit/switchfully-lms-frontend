import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {RegisterComponent} from "./components/register/register.component";
import { NavbarComponent } from './components/navbar/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RegisterComponent, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'switchfully-lms-frontend';
}
