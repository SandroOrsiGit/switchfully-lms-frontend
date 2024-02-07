// import {ComponentFixture, TestBed, tick} from '@angular/core/testing';
// import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
// import { ClassgroupDetailComponent } from './classgroup-overview.component';
// import { ClassGroupService } from '../../services/class-group.service';
// import { UserService } from '../../services/user.service';
// import { of } from 'rxjs';
// import { ClassGroupDto } from '../../models/ClassGroupDto';
// import { User } from '../../models/User';
// import {HttpClientTestingModule} from "@angular/common/http/testing";
// import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
//
// class ActivatedRouteStub {
//   private subject = of({ paramMap: convertToParamMap({ courseId: '1' }) });
//
//   get params() {
//     return this.subject;
//   }
// }
//
// describe('ClassgroupDetailComponent', () => {
//   let component: ClassgroupDetailComponent;
//   let fixture: ComponentFixture<ClassgroupDetailComponent>;
//   let classGroupServiceMock: jasmine.SpyObj<ClassGroupService>;
//   let userServiceMock: jasmine.SpyObj<UserService>;
//   let routerMock: jasmine.SpyObj<Router>;
//   let activatedRoute: ActivatedRoute;
//   let classGroup: ClassGroupDto;
//
//   beforeEach(() => {
//     classGroupServiceMock = jasmine.createSpyObj('ClassGroupService', ['getClassGroupByClassGroupId']);
//     userServiceMock = jasmine.createSpyObj('UserService', ['getCurrentUser']);
//     routerMock = jasmine.createSpyObj('Router', ['navigate']);
//     classGroup = {
//       id: 1,
//       name: 'Java Testing Classgroup',
//       course_id: 1,
//       coaches: [],
//       students: []
//     };
//     activatedRoute = {
//       snapshot: {
//         paramMap: convertToParamMap({ id: '1' })
//       }
//     } as any;
//
//     TestBed.configureTestingModule({
//       declarations: [],
//       imports: [
//         HttpClientTestingModule,
//         BrowserAnimationsModule,
//         ClassgroupDetailComponent
//       ],
//       providers: [
//         { provide: ClassGroupService, useValue: classGroupServiceMock },
//         { provide: UserService, useValue: userServiceMock },
//         { provide: Router, useValue: routerMock },
//         { provide: ActivatedRoute, useValue: ActivatedRouteStub },
//       ]
//     })
//       .compileComponents();
//
//     fixture = TestBed.createComponent(ClassgroupDetailComponent);
//     component = fixture.componentInstance;
//
//
//     classGroupServiceMock.getClassGroupByClassGroupId.and.returnValue(of(classGroup));
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
//
//   it('should fetch class group details on init', () => {
//     component.ngOnInit();
//     tick();
//     fixture.detectChanges();
//
//     expect(classGroupServiceMock.getClassGroupByClassGroupId).toHaveBeenCalledWith(1);
//     expect(component.classGroup).toEqual(classGroup);
//   });
//
//   it('should set loggedInUser on init', () => {
//     const loggedInUser: User = { id: 1, email: 'john@gmail.com', displayName: 'John Doe', role: 'coach', classes: [], password: 'password' };
//     userServiceMock.getCurrentUser.and.returnValue(loggedInUser);
//
//     component.ngOnInit();
//
//     expect(userServiceMock.getCurrentUser).toHaveBeenCalled();
//     expect(component.loggedInUser).toEqual(loggedInUser);
//   });
//
//   it('should check if the user is a coach', () => {
//     const loggedInUser: User = { id: 1, email: 'john@gmail.com', displayName: 'John Doe', role: 'coach', classes: [], password: 'password' };
//     userServiceMock.getCurrentUser.and.returnValue(loggedInUser);
//
//     const isCoach = component.isCoach();
//
//     expect(isCoach).toBeTruthy();
//   });
//
//   // it('should navigate to student overview page when a student name is clicked by a coach', () => {
//   //   const studentId = 2;
//   //   const loggedInUser: User = { id: 1, email: 'john@gmail.com', displayName: 'John Doe', role: 'coach', classes: [], password: 'password' };
//   //   userServiceMock.getCurrentUser.and.returnValue(loggedInUser);
//   //   const navigateSpy = spyOn(routerMock, 'navigate');
//   //
//   //   component.redirectToStudentOverviewPage(studentId);
//   //
//   //   expect(navigateSpy).toHaveBeenCalledWith(['/student-overview', studentId]);
//   // });
// });
