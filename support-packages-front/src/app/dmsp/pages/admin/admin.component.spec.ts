import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminComponent } from './admin.component';
import { of } from 'rxjs';
import { DialogModule } from 'primeng/dialog';
import { SharedService } from '../../../shared/services/shared.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let mockSharedService;

  beforeEach(() => {
    mockSharedService = {
      getActiveAdminTools: jest
        .fn()
        .mockReturnValue(of({ result: [{ id: 1, name: 'Active Tool' }] })),
      getRequestedAdminTools: jest
        .fn()
        .mockReturnValue(of({ result: [{ id: 2, name: 'Requested Tool' }] })),
      getDisabledAdminTools: jest
        .fn()
        .mockReturnValue(of({ result: [{ id: 3, name: 'Desactive Tool' }] })),
      login: jest.fn().mockReturnValue(of({ result: { token: 'fake-token' } })),
      isLoggedDMSP: { set: jest.fn() },
    };

    TestBed.configureTestingModule({
      imports: [DialogModule, RouterTestingModule],
      providers: [{ provide: SharedService, useValue: mockSharedService }],
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

  it('should set isLoggedDMSP to true if token is present', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue('fake-token');
    component.ngOnInit();
    expect(mockSharedService.isLoggedDMSP.set).toHaveBeenCalledWith({ status: true });
  });

  it('should call getActiveTools on init', () => {
    const getActiveToolsSpy = jest.spyOn(component, 'getActiveTools');
    component.ngOnInit();
    expect(getActiveToolsSpy).toHaveBeenCalled();
  });

  it('should handle active item change correctly', () => {
    const getActiveToolsSpy = jest.spyOn(component, 'getActiveTools');
    const getDisabledToolsSpy = jest.spyOn(component, 'getDisabledTools');
    const getRequestedToolsSpy = jest.spyOn(component, 'getRequestedTools');

    component.onActiveItemChange({ id: '0' } as any);
    expect(getActiveToolsSpy).toHaveBeenCalled();

    component.onActiveItemChange({ id: '1' } as any);
    expect(getDisabledToolsSpy).toHaveBeenCalled();

    component.onActiveItemChange({ id: '2' } as any);
    expect(getRequestedToolsSpy).toHaveBeenCalled();

    component.onActiveItemChange({ id: '3' } as any);
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
    component.getDisabledTools();
    expect(component.loading).toBe(false);
    expect(component.disabledToolsData.length).toBe(1);
    expect(component.disabledToolsData[0].name).toBe('Desactive Tool');
  });

  it('should get token from local storage', () => {
    const getItemSpy = jest.spyOn(Storage.prototype, 'getItem').mockReturnValue('fake-token');
    expect(component.getlocalStorageToken()).toBe('fake-token');
    expect(getItemSpy).toHaveBeenCalledWith('tokenDMSP');
  });

  it('should remove token from local storage and reset login form', () => {
    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');
    component.handleLogout();
    expect(removeItemSpy).toHaveBeenCalledWith('tokenDMSP');
  });
});
