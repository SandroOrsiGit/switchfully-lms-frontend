import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfileComponent} from './profile.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Router} from '@angular/router';
import {KeycloakService} from '../../services/keycloak.service';
import {UserService} from '../../services/user.service';
import {User} from '../../models/User';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let keyCloakServiceMock: jasmine.SpyObj<KeycloakService>
  let routerMock: jasmine.SpyObj<Router>
  let userServiceMock: jasmine.SpyObj<UserService>

  beforeEach( () => {
    keyCloakServiceMock = jasmine.createSpyObj('KeycloakService', ['isLoggedIn']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);
    userServiceMock = jasmine.createSpyObj('userService', ['getCurrentUser'])
    TestBed.configureTestingModule({
      imports: [
        ProfileComponent,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        {provide: KeycloakService, useValue: keyCloakServiceMock},
        {provide: Router, useValue: routerMock},
        {provide: UserService, useValue: userServiceMock},
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;

  });

  it('should navigate to login when not logged in', () => {
    keyCloakServiceMock.isLoggedIn.and.returnValue(false);

    component.ngOnInit();

    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  })

  it('should be invalid when fields are empty', () => {
    component.id.setValue(null);
    component.email.setValue('');
    component.displayName.setValue('');
    component.password.setValue('');
    component.passwordConfirm.setValue('');
    expect(component.updateProfileForm.valid).toBeFalsy();
  });

  it('should initialize form controls with user data', () => {
    const userData: User = {
      id: 123,
      email: 'test@example.com',
      displayName: 'Test User',
      password: 'password123',
      classes: [],
    };
    userServiceMock.getCurrentUser.and.returnValue(userData)

    fixture.detectChanges();

    component.id.setValue(userData.id);
    component.email.setValue(userData.email);
    component.displayName.setValue(userData.displayName);
    component.password.setValue(userData.password);
    component.passwordConfirm.setValue(userData.password);

    expect(component.updateProfileForm.value.id).toEqual(userData.id);
    expect(component.email.value).toEqual(userData.email);
    expect(component.displayName.value).toEqual(userData.displayName);
    expect(component.password.value).toEqual(userData.password);
    expect(component.passwordConfirm.value).toEqual(userData.password);
    expect(userServiceMock.getCurrentUser).toHaveBeenCalled();
  });

  it('it should display one class-group', () => {
    const userData: User = {
      id: 123,
      email: 'test@example.com',
      displayName: 'Test User',
      role: 'student',
      password: 'password123',
      classes: [
        {
          id: 1,
          name: 'Classgroup_test1',
          course_id: 1,
          coachDtoList: [
            {
              id: 456,
              email: 'coach@example.com',
              displayName: 'Coach Name',
            }
          ],
          studentNoCodelabProgressDtoList: [
            {
              id: 789,
              email: 'student@example.com',
              displayName: 'Student Name',
            }
          ],
        }
      ],
    };

    userServiceMock.getCurrentUser.and.returnValue(userData);
    component.user = userData;

    fixture.detectChanges();

    const classListHeading = fixture.nativeElement.querySelector('.class-list h3');
    expect(classListHeading.textContent).toContain('Your Classes');

    const classElements = fixture.nativeElement.querySelectorAll('.class-list p');
    expect(classElements.length).toBe(userData.classes.length);

    userData.classes.forEach((classGroup, index) => {
      const expectedClassName = classGroup.name;
      const actualClassName = classElements[index].textContent.trim();
      expect(actualClassName).toContain(expectedClassName);
    });
  });

  it('it should display multiples class-groups', () => {
    const userData: User = {
      id: 123,
      email: 'test@example.com',
      displayName: 'Test User',
      role: 'student',
      password: 'password123',
      classes: [
        {
          id: 1,
          name: 'Classgroup_test1',
          course_id: 1,
          coachDtoList: [
            {
              id: 456,
              email: 'coach@example.com',
              displayName: 'Coach Name',
            }
          ],
          studentNoCodelabProgressDtoList: [
            {
              id: 789,
              email: 'student@example.com',
              displayName: 'Student Name',
            }
          ],
        }
      ],
    };
    userServiceMock.getCurrentUser.and.returnValue(userData);
    component.user = userData;

    fixture.detectChanges();

    const classListHeading = fixture.nativeElement.querySelector('.class-list h3');
    expect(classListHeading.textContent).toContain('Your Classes');

    const classElements = fixture.nativeElement.querySelectorAll('.class-list p');
    expect(classElements.length).toBe(userData.classes.length);

    userData.classes.forEach((classGroup, index) => {
      const expectedClassName = classGroup.name;
      const actualClassName = classElements[index].textContent.trim();
      expect(actualClassName).toContain(expectedClassName);

    });
  });

  it('if there are no class groups hide the title "Your Classes"', () => {
    const userData: User = {
      id: 123,
      email: 'test@example.com',
      displayName: 'Test User',
      role: 'student',
      password: 'password123',
      classes: [
        {
          id: 1,
          name: 'Classgroup_test1',
          course_id: 1,
          coachDtoList: [
            {
              id: 456,
              email: 'coach@example.com',
              displayName: 'Coach Name',
            }
          ],
          studentNoCodelabProgressDtoList: [
            {
              id: 789,
              email: 'student@example.com',
              displayName: 'Student Name',
            }
          ],
        }
      ],
    };
    userServiceMock.getCurrentUser.and.returnValue(userData);
    component.user = userData;

    fixture.detectChanges();
    const classListHeading = fixture.nativeElement.querySelector('.class-list h3');
    const classElements = fixture.nativeElement.querySelectorAll('.class-list p');
    expect(classListHeading).toBeNull();
    expect(classElements.length).toBe(0);

    });
  });



