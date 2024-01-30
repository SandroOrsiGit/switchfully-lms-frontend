// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
// import { ClassgroupOverviewComponent } from './classgroup-overview.component';
// import { ClassGroupService } from '../../services/class-group.service';
// import { UserService } from '../../services/user.service';
// import { of } from 'rxjs';
// import { ClassGroup } from '../../models/ClassGroup';
// import { User } from '../../models/User';
//
// describe('ClassgroupOverviewComponent', () => {
//   let component: ClassgroupOverviewComponent;
//   let fixture: ComponentFixture<ClassgroupOverviewComponent>;
//   let classGroupService: jasmine.SpyObj<ClassGroupService>;
//   let userService: jasmine.SpyObj<UserService>;
//   let router: jasmine.SpyObj<Router>;
//   let activatedRoute: ActivatedRoute;
//
//   beforeEach(() => {
//     classGroupService = jasmine.createSpyObj('ClassGroupService', ['getClassGroupByClassGroupId']);
//     userService = jasmine.createSpyObj('UserService', ['getCurrentUser']);
//     router = jasmine.createSpyObj('Router', ['navigate']);
//     activatedRoute = {
//       snapshot: {
//         paramMap: convertToParamMap({ id: '1' })
//       }
//     } as any;
//
//     TestBed.configureTestingModule({
//       declarations: [ClassgroupOverviewComponent],
//       providers: [
//         { provide: ClassGroupService, useValue: classGroupService },
//         { provide: UserService, useValue: userService },
//         { provide: Router, useValue: router },
//         { provide: ActivatedRoute, useValue: activatedRoute },
//       ]
//     })
//       .compileComponents();
//
//     fixture = TestBed.createComponent(ClassgroupOverviewComponent);
//     component = fixture.componentInstance;
//
//
//     classGroupService.getClassGroupByClassGroupId.and.returnValue(of(classGroup));
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
//
//   it('should fetch class group details on init', () => {
//     component.ngOnInit();
//
//     expect(classGroupService.getClassGroupByClassGroupId).toHaveBeenCalledWith(1);
//     expect(component.classGroup).toEqual(classGroup);
//   });
//
//   it('should set loggedInUser on init', () => {
//     const loggedInUser: User = { id: 1, name: 'John Doe', role: 'coach' }; // Provide sample user data
//     userService.getCurrentUser.and.returnValue(loggedInUser);
//
//     component.ngOnInit();
//
//     expect(userService.getCurrentUser).toHaveBeenCalled();
//     expect(component.loggedInUser).toEqual(loggedInUser);
//   });
//
//   it('should check if the user is a coach', () => {
//     const loggedInUser: User = { id: 1, name: 'John Doe', role: 'coach' }; // Provide sample user data
//     userService.getCurrentUser.and.returnValue(loggedInUser);
//
//     const isCoach = component.isCoach();
//
//     expect(isCoach).toBeTruthy();
//   });
//
//   it('should navigate to student overview page when a student name is clicked by a coach', () => {
//     const studentId = 2;
//     const loggedInUser: User = { id: 1, name: 'John Doe', role: 'coach' }; // Provide sample user data
//     userService.getCurrentUser.and.returnValue(loggedInUser);
//     const navigateSpy = spyOn(router, 'navigate');
//
//     component.redirectToStudentOverviewPage(studentId);
//
//     expect(navigateSpy).toHaveBeenCalledWith(['/student-overview', studentId]);
//   });
// });
