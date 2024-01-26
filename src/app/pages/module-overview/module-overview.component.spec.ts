import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleOverviewComponent } from './module-overview.component';
import {ModuleService} from "../../services/module.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {KeycloakService} from "../../services/keycloak.service";
import {UserService} from "../../services/user.service";
import {of} from "rxjs";
import {ModuleDto} from "../../dtos/ModuleDto";
import {Router} from "@angular/router";

describe('ModuleOverviewComponent', () => {
  let component: ModuleOverviewComponent;
  let fixture: ComponentFixture<ModuleOverviewComponent>;
  let moduleServiceMock: jasmine.SpyObj<ModuleService>;
  let keyCloakServiceMock: jasmine.SpyObj<KeycloakService>;
  let routerMock: jasmine.SpyObj<Router>;
  let userServiceMock: jasmine.SpyObj<UserService>;

  beforeEach(() => {
    keyCloakServiceMock = jasmine.createSpyObj('KeycloakService', ['isLoggedIn']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);
    userServiceMock = jasmine.createSpyObj('userService', ['getCurrentUser']);
    moduleServiceMock = jasmine.createSpyObj('moduleService', ['getModules']);

    TestBed.configureTestingModule({
      imports: [ModuleOverviewComponent,
      HttpClientTestingModule,
      BrowserAnimationsModule
      ],
      providers: [
        {provide: KeycloakService, useValue: keyCloakServiceMock},
        {provide: Router, useValue: routerMock},
        {provide: ModuleService, useValue: moduleServiceMock},
        {provide: UserService, useValue: userServiceMock}
      ]})
    .compileComponents();

    fixture = TestBed.createComponent(ModuleOverviewComponent);
    component = fixture.componentInstance;
  });

  it('should call getModules on NgOnInit', () => {
    const modules: ModuleDto[] = [{id: 1, name: "Module 1", codelabs: [], subModules: []}];
    moduleServiceMock.getModules.and.returnValue(of(modules));

    component.ngOnInit();

    expect(moduleServiceMock.getModules).toHaveBeenCalled();
    expect(component.modules).toEqual(modules);
  });

  //TODO failing test

  // it('should display one module from courseId 1', () => {
  //   const courseId = 1;
  //   const modules: ModuleDto[] = [{id: 1, name: "Module 1", codelabs: [], subModules: []}];
  //
  //   spyOn(component['moduleService'], 'getModules').and.returnValue(of(modules));
  //
  //   component.ngOnInit();
  //
  //   fixture.detectChanges();
  //
  //   const result = fixture.debugElement.nativeElement;
  //   expect(result.querySelector('td').textContent).toContain("Module 1");
  // })

});
