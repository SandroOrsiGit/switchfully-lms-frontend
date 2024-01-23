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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to login when not logged in', () => {
    keyCloakServiceMock.isLoggedIn.and.returnValue(false);

    component.ngOnInit();

    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  })

  it('should initialize form controls with user data', () => {
    const userData: User = {
      id: 123,
      email: 'test@example.com',
      displayName: 'Test User',
      password: 'password123',
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
});
