import { Component, OnInit } from '@angular/core';
import { TestService } from '../../services/test.service';

@Component({
  selector: 'app-testpage',
  standalone: true,
  imports: [],
  templateUrl: './testpage.component.html',
  styleUrl: './testpage.component.css'
})
export class TestpageComponent implements OnInit {
  constructor(private testService: TestService) {}

  ngOnInit(): void {
    this.testService.getPublic().subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
    this.testService.getStudentAuth().subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
    this.testService.getCoachAuth().subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }

}
