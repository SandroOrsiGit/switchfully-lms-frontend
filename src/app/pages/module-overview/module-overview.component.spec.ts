import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModuleOverviewComponent } from './module-overview.component';
import { ModuleService } from '../../services/module.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KeycloakService } from '../../services/keycloak.service';
import { UserService } from '../../services/user.service';
import { of } from 'rxjs';
import { ModuleDto } from '../../dtos/ModuleDto';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { By } from '@angular/platform-browser';

class ActivatedRouteStub {
  private subject = of({ paramMap: convertToParamMap({ courseId: '1' }) });

  get params() {
    return this.subject;
  }
}

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
      imports: [HttpClientTestingModule, BrowserAnimationsModule, ModuleOverviewComponent],
      declarations: [],
      providers: [
        { provide: KeycloakService, useValue: keyCloakServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ModuleService, useValue: moduleServiceMock },
        { provide: UserService, useValue: userServiceMock },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ModuleOverviewComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getModules on NgOnInit', () => {
    const modules: ModuleDto[] = [{ id: 1, name: 'Module 1', codelabs: [], subModules: [] }];
    moduleServiceMock.getModules.and.returnValue(of(modules));

    component.ngOnInit();

    expect(moduleServiceMock.getModules).toHaveBeenCalled();
    expect(component.modules).toEqual(modules);
  });

  it('should display module details correctly in the table', () => {
    const modules: ModuleDto[] = [
      { id: 1, name: 'Module 1', codelabs: [], subModules: [] },
      { id: 2, name: 'Module 2', codelabs: [], subModules: [] },
    ];
    moduleServiceMock.getModules.and.returnValue(of(modules));
  
    component.ngOnInit();
    fixture.detectChanges();
  
    const debugElement = fixture.debugElement;
    const matRows = debugElement.queryAll(By.css('tr[mat-row]'));
  
    expect(matRows.length).toBe(2);
  
    // First module
    const firstRowCells = matRows[0].queryAll(By.css('td[mat-cell]'));
    expect(firstRowCells.length).toBe(2);
  
    const cellValue1 = firstRowCells[0].nativeElement.innerText.trim();
    const moduleProperty1 = modules[0].id;
    expect(cellValue1).toBe(moduleProperty1.toString());
  
    const cellValue2 = firstRowCells[1].nativeElement.innerText.trim();
    const moduleProperty2 = modules[0].name;
    expect(cellValue2).toBe(moduleProperty2);
  
    // Second module
    const secondRowCells = matRows[1].queryAll(By.css('td[mat-cell]'));
    expect(secondRowCells.length).toBe(2);
  
    const cellValue3 = secondRowCells[0].nativeElement.innerText.trim();
    const moduleProperty3 = modules[1].id;
    expect(cellValue3).toBe(moduleProperty3.toString());
  
    const cellValue4 = secondRowCells[1].nativeElement.innerText.trim();
    const moduleProperty4 = modules[1].name;
    expect(cellValue4).toBe(moduleProperty4);
  });
  
});
