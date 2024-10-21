import { CommonModule } from '@angular/common';
import { Component, inject, Input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SharedService } from '../services/shared.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, ToastModule],
  providers: [MessageService],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  @Input() app_id: string;
  loginForm = signal({
    email: '',
    password: '',
  });

  isLoading = signal(false);

  public _sharedService = inject(SharedService);
  private readonly messageService = inject(MessageService);

  handleLogin() {
    this.isLoading.set(true);

    try {
      this._sharedService.login({ ...this.loginForm(), app_id: this.app_id }).subscribe((data) => {
        if (data.result === 'userNotFound' || data.result === 'invalidPassword') {
          this.isLoading.set(false);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Invalid email or password',
          });

          return;
        }

        if (data.result === 'notPermission') {
          this.isLoading.set(false);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'User does not have permission to access this app',
          });

          return;
        }

        switch (this.app_id) {
          case '1':
            localStorage.setItem('tokenDMSP', data.result.token);
            this._sharedService.isLoggedDMSP.set({
              status: true,
            });
            break;
          case '2': {
            localStorage.setItem('tokenMELSP', data.result.token);
            this._sharedService.isLoggedMELSP.set({
              status: true,
            });
            break;
          }
          case '3': {
            localStorage.setItem('tokenLearningZone', data.result.token);
            this._sharedService.isLoggedLearningZone.set({
              status: true,
            });
            break;
          }
          default:
            break;
        }

        this.isLoading.set(false);
      });
    } catch (error) {
      console.error(error);
      this.isLoading.set(false);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Internal Server Error',
      });
    }
  }
}
