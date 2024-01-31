import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseOverviewComponent } from './course-overview.component';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CourseService } from "../../services/course.service";
import { KeycloakService } from "../../services/keycloak.service";
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CourseDto } from "../../dtos/CourseDto";
import { of } from "rxjs";
import { By } from "@angular/platform-browser";
import { MatTableModule } from "@angular/material/table";
import { MatCardModule } from "@angular/material/card";
import { ModuleDto } from '../../dtos/ModuleDto';

describe('CourseOverviewComponent', () => {
  let component: CourseOverviewComponent;
  let fixture: ComponentFixture<CourseOverviewComponent>;
  let courseServiceMock: jasmine.SpyObj<CourseService>;
  let keyCloakServiceMock: jasmine.SpyObj<KeycloakService>;
  let routerMock: jasmine.SpyObj<Router>;
  let userServiceMock: jasmine.SpyObj<UserService>;

  beforeEach(() => {
    keyCloakServiceMock = jasmine.createSpyObj('KeycloakService', ['isLoggedIn']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);
    userServiceMock = jasmine.createSpyObj('userService', ['getCurrentUser']);
    courseServiceMock = jasmine.createSpyObj('courseService', ['getCourses']);

    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, HttpClientTestingModule, MatTableModule, MatCardModule, CourseOverviewComponent],
      declarations: [],
      providers: [
        { provide: KeycloakService, useValue: keyCloakServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: CourseService, useValue: courseServiceMock },
        { provide: UserService, useValue: userServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseOverviewComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getCourses on NgOnInit', ()=> {
    const courses: CourseDto[]= [{id: 4, name: 'Java'}];
    courseServiceMock.getCourses.and.returnValue(of(courses));

    component.ngOnInit();

    expect(courseServiceMock.getCourses).toHaveBeenCalled();
    expect(component.courses).toEqual(courses);
  });
  
  // it('should display two courses in the table', () => {
  //   const courses: CourseDto[] = [
  //     { id: 4, name: 'Java' },
  //     { id: 5, name: 'Angular'},
  //   ];
  //   courseServiceMock.getCourses.and.returnValue(of(courses));

  //   fixture.detectChanges();

  //   const debugElement = fixture.debugElement;
  //   const matRows = debugElement.queryAll(By.css('tr[mat-row]'));
  //   console.log(matRows)
    // expect(component.courses).toEqual(courses);

    // let test: any[] = fixture.debugElement.nativeElement.querySelector('tr[mat-row]')
    // console.log(test)

    // expect(matRows.length).toBe(2);

    // First course
    // const firstRowCells = matRows[0].queryAll(By.css('td[mat-cell]'));
    // expect(firstRowCells.length).toBe(2);

    // const cellValue1 = firstRowCells[0].nativeElement.innerText.trim();
    // const courseProperty1 = courses[0].id;
    // expect(cellValue1).toBe(courseProperty1.toString());

    // const cellValue2 = firstRowCells[1].nativeElement.innerText.trim();
    // const courseProperty2 = courses[0].name;
    // expect(cellValue2).toBe(courseProperty2);

    // // Second course
    // const secondRowCells = matRows[1].queryAll(By.css('td[mat-cell]'));
    // expect(secondRowCells.length).toBe(2);

    // const cellValue3 = secondRowCells[0].nativeElement.innerText.trim();
    // const courseProperty3 = courses[1].id;
    // expect(cellValue3).toBe(courseProperty3.toString());

    // const cellValue4 = secondRowCells[1].nativeElement.innerText.trim();
    // const courseProperty4 = courses[1].name;
    // expect(cellValue4).toBe(courseProperty4);
  // });

});
