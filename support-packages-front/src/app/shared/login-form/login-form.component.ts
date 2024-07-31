import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  @Input() app_id: string;
  loginForm = signal({
    email: '',
    password: '',
  });

  error = signal({
    status: false,
    message: '',
  });

  isLoading = signal(false);

  _sharedService = inject(SharedService);

  handleLogin() {
    this.isLoading.set(true);

    try {
      this._sharedService.login({ ...this.loginForm(), app_id: this.app_id }).subscribe((data) => {
        console.log(data);
        if (data.result === 'user not found' || data.result === 'Invalid password') {
          this.error.set({
            status: true,
            message: 'Invalid email or password',
          });
          this.isLoading.set(false);

          return;
        }

        if (data.result === 'notPermission') {
          this.error.set({
            status: true,
            message: 'User does not have permission to access this app',
          });
          this.isLoading.set(false);

          return;
        }

        localStorage.setItem('tokenMELSP', data.result.token);

        this._sharedService.isLoggedMELSP.set({
          status: true,
        });

        this.isLoading.set(false);
      });
    } catch (error) {
      console.error(error);
      this.isLoading.set(false);
      this.error.set({
        status: true,
        message: 'Internal Server Error',
      });
    }
  }
}
