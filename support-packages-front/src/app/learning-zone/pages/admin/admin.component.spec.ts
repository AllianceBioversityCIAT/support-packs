import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminComponent } from './admin.component';
import { ServicesLearningZoneService } from '../../services/services-learning-zone.service';
import { of } from 'rxjs';
import { DialogModule } from 'primeng/dialog';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let mockServicesLearningZoneService;

  beforeEach(() => {
    mockServicesLearningZoneService = {
      getToolsAdmin: jest.fn().mockReturnValue(of({ result: [{ id: 1, name: 'Active Tool' }] })),
      getToolsAdminRquest: jest
        .fn()
        .mockReturnValue(of({ result: [{ id: 2, name: 'Requested Tool' }] })),
      getToolsAdminDesactive: jest
        .fn()
        .mockReturnValue(of({ result: [{ id: 3, name: 'Desactive Tool' }] })),
      login: jest.fn().mockReturnValue(of({ result: { token: 'fake-token' } })),
    };

    TestBed.configureTestingModule({
      declarations: [AdminComponent],
      imports: [DialogModule],
      providers: [
        { provide: ServicesLearningZoneService, useValue: mockServicesLearningZoneService },
      ],
    });

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize items and activeItem on init', () => {
    component.ngOnInit();
    expect(component.items.length).toBe(3);
    expect(component.activeItem).toBe(component.items[0]);
  });

  it('should call getActiveTools on init', () => {
    const getActiveToolsSpy = jest.spyOn(component, 'getActiveTools');
    component.ngOnInit();
    expect(getActiveToolsSpy).toHaveBeenCalled();
  });

  it('should hide login dialog if token is found in local storage', () => {
    jest.spyOn(component, 'getlocalStorageToken').mockReturnValue('fake-token');
    component.ngOnInit();
    expect(component.dialogLogin).toBe(false);
  });

  it('should handle active item change correctly', () => {
    const getActiveToolsSpy = jest.spyOn(component, 'getActiveTools');
    const getDesactiveToolsSpy = jest.spyOn(component, 'getDesactiveTools');
    const getRequestedToolsSpy = jest.spyOn(component, 'getRequestedTools');

    component.onActiveItemChange({ id: 0 } as any);
    expect(getActiveToolsSpy).toHaveBeenCalled();

    component.onActiveItemChange({ id: 1 } as any);
    expect(getDesactiveToolsSpy).toHaveBeenCalled();

    component.onActiveItemChange({ id: 2 } as any);
    expect(getRequestedToolsSpy).toHaveBeenCalled();

    component.onActiveItemChange({ id: 3 } as any);
  });

  it('should fetch active tools data and set loading to false', () => {
    component.getActiveTools();
    expect(component.loading).toBe(false);
    expect(component.activeToolsData.length).toBe(1);
    expect(component.activeToolsData[0].name).toBe('Active Tool');
  });

  it('should fetch requested tools data and set loading to false', () => {
    component.getRequestedTools();
    expect(component.loading).toBe(false);
    expect(component.requestedToolsData.length).toBe(1);
    expect(component.requestedToolsData[0].name).toBe('Requested Tool');
  });

  it('should fetch desactive tools data and set loading to false', () => {
    component.getDesactiveTools();
    expect(component.loading).toBe(false);
    expect(component.desactiveToolsData.length).toBe(1);
    expect(component.desactiveToolsData[0].name).toBe('Desactive Tool');
  });

  it('should handle login correctly', () => {
    const localStorageTokenSpy = jest.spyOn(component, 'localStorageToken');
    component.loginForm.email = 'test@example.com';
    component.loginForm.password = 'password';
    component.handleLogin();
    expect(localStorageTokenSpy).toHaveBeenCalledWith('fake-token');
    expect(component.dialogLogin).toBe(false);
  });

  it('should handle login errors correctly', () => {
    jest
      .spyOn(mockServicesLearningZoneService, 'login')
      .mockReturnValue(of({ result: 'user not found' }));
    component.handleLogin();
    expect(component.error.status).toBe(true);
    expect(component.error.message).toBe('User not found or invalid password');
  });

  it('should store token in local storage', () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    component.localStorageToken('fake-token');
    expect(setItemSpy).toHaveBeenCalledWith('token', 'fake-token');
  });

  it('should get token from local storage', () => {
    const getItemSpy = jest.spyOn(Storage.prototype, 'getItem').mockReturnValue('fake-token');
    expect(component.getlocalStorageToken()).toBe('fake-token');
    expect(getItemSpy).toHaveBeenCalledWith('token');
  });

  it('should remove token from local storage and reset login form', () => {
    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');
    component.setlocalStorageToken();
    expect(removeItemSpy).toHaveBeenCalledWith('token');
    expect(component.dialogLogin).toBe(true);
    expect(component.loginForm.email).toBe('');
    expect(component.loginForm.password).toBe('');
  });
});
