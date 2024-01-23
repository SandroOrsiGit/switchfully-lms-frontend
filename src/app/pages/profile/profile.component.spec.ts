import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {ProfileComponent} from './profile.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Router} from '@angular/router';
import {KeycloakService} from '../../services/keycloak.service';
import {ChangeDetectionStrategy} from '@angular/core';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let keyCloakServiceMock: jasmine.SpyObj<KeycloakService>
  let routerMock: jasmine.SpyObj<Router>

  beforeEach(async () => {
    keyCloakServiceMock = jasmine.createSpyObj('KeycloakService', ['isLoggedIn'])
    routerMock = jasmine.createSpyObj('Router', ['navigate'])
    await TestBed.configureTestingModule({
      imports: [
        ProfileComponent,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        {provide: KeycloakService, useValue: keyCloakServiceMock},
        {provide: Router, useValue: routerMock}
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

  it('should initialize form controls with user data', fakeAsync(() => {
    const userData = {
      id: 123,
      email: 'test@example.com',
      displayName: 'Test User',
      password: 'password123',
    };

    component.user = userData;
    fixture.detectChanges();
    tick();

    expect(component.updateProfileForm.value.id).toEqual(userData.id);
    expect(component.email.value).toEqual(userData.email);
    expect(component.displayName.value).toEqual(userData.displayName);
    expect(component.password.value).toEqual(userData.password);
    expect(component.passwordConfirm.value).toEqual(userData.password);
  }));
});
