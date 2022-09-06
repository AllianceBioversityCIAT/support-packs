import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hasError = null;

  @Output() userLogged = new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.spinner.show();
    this.authenticationService
      .login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.spinner.hide();
          this.userLogged.emit(true);
          // console.log(data, 'loged in')
        },
        (error) => {
          this.spinner.hide();
          console.error('onSubmit', error);
          this.hasError = error.statusText;
          setTimeout(() => {
            this.hasError = null;
          }, 3000);
        }
      );
  }
}
