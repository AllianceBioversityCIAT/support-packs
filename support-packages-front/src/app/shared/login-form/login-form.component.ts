import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
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
  loginForm = signal({
    email: '',
    password: '',
  });

  error = signal({
    status: false,
    message: '',
  });

  _sharedService = inject(SharedService);

  handleLogin() {
    try {
      this._sharedService.login(this.loginForm()).subscribe((data) => {
        if (data.result === 'user not found' || data.result === 'Invalid password') {
          this.error.set({
            status: true,
            message: 'Invalid email or password',
          });

          return;
        }

        localStorage.setItem('tokenMELSP', data.result.token);

        this._sharedService.isLoggedMELSP.set({
          status: true,
        });
      });
    } catch (error) {
      console.error(error);
      this.error.set({
        status: true,
        message: 'Internal Server Error',
      });
    }
  }
}
