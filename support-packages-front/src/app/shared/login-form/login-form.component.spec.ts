import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { SharedService } from '../services/shared.service';
import { LoginFormComponent } from './login-form.component';
import { of, throwError } from 'rxjs';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let sharedServiceMock: any;
  let messageServiceMock: any;

  beforeEach(() => {
    sharedServiceMock = {
      login: jest.fn(),
    };
    messageServiceMock = {
      add: jest.fn(),
    };

    TestBed.configureTestingModule({
      imports: [FormsModule, ButtonModule, InputTextModule, ToastModule],
      providers: [
        { provide: SharedService, useValue: sharedServiceMock },
        { provide: MessageService, useValue: messageServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should handle login and set loading state correctly', () => {
    const loginResponse = {
      result: {
        token: 'mockToken',
      },
    };

    sharedServiceMock.login.mockReturnValue(of(loginResponse));

    component.app_id = '2';
    component.loginForm.set({ email: 'test@example.com', password: 'password' });

    component.handleLogin();

    expect(component.isLoading()).toBe(true);
  });

  it('should show error message for invalid email or password', () => {
    const loginResponse = {
      result: 'invalidPassword',
    };

    sharedServiceMock.login.mockReturnValue(of(loginResponse));

    component.handleLogin();

    expect(component.isLoading()).toBe(false);
  });

  it('should show error message for user without permission', () => {
    const loginResponse = {
      result: 'notPermission',
    };

    sharedServiceMock.login.mockReturnValue(of(loginResponse));

    component.handleLogin();

    expect(component.isLoading()).toBe(false);
  });

  it('should handle internal server error', () => {
    sharedServiceMock.login.mockReturnValue(throwError(() => new Error('Internal Server Error')));

    component.handleLogin();

    expect(component.isLoading()).toBe(true);
  });

  it('should handle login for app_id 1', () => {
    const loginResponse = {
      result: {
        token: 'mockToken',
      },
    };
    sharedServiceMock.login.mockReturnValue(of(loginResponse));
    component.app_id = '1';

    component.handleLogin();

    expect(component.isLoading()).toBe(true);
    expect(localStorage.getItem('tokenDMSP')).toBe('mockToken');
  });

  it('should handle login for app_id 2', () => {
    const loginResponse = {
      result: {
        token: 'mockToken',
      },
    };
    sharedServiceMock.login.mockReturnValue(of(loginResponse));
    component.app_id = '2';

    component.handleLogin();

    expect(component.isLoading()).toBe(true);
    expect(localStorage.getItem('tokenMELSP')).toBe('mockToken');
  });

  it('should handle login for app_id 3', () => {
    const loginResponse = {
      result: {
        token: 'mockToken',
      },
    };

    sharedServiceMock.login.mockReturnValue(of(loginResponse));
    component.app_id = '3';

    component.handleLogin();

    expect(component.isLoading()).toBe(true);
    expect(localStorage.getItem('tokenLearningZone')).toBe('mockToken');
  });

  it('should handle login for unknown app_id', () => {
    const loginResponse = {
      result: {
        token: 'mockToken',
      },
    };

    sharedServiceMock.login.mockReturnValue(of(loginResponse));
    component.app_id = '4';

    component.handleLogin();

    expect(component.isLoading()).toBe(false);
  });
});
