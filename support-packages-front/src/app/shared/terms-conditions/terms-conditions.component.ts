import { Component, Input } from '@angular/core';
import { ServicesTermsService } from '../services/services-terms.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface ICity {
  id: number;
  name: string;
}

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.scss'],
})
export class TermsConditionsComponent {
  @Input() app_id: number;
  @Input() tools: any;

  isLoading = false;

  email = '';
  emailError = false;
  cities: ICity[] = [
    { name: 'Africa', id: 1 },
    { name: 'Asia', id: 2 },
    { name: 'Australia and Oceania', id: 3 },
    { name: 'Central America and the Caribbean', id: 4 },
    { name: 'Middle East and North Africa', id: 5 },
    { name: 'North America', id: 6 },
    { name: 'South America', id: 7 },
    { name: 'Europe', id: 8 },
  ];

  formData: FormGroup = this.fb.group({
    first_name: ['', [Validators.required, Validators.minLength(3)]],
    last_name: ['', [Validators.required, Validators.minLength(3)]],
    institute: ['', [Validators.required, Validators.minLength(3)]],
    interestRegions: [[], [Validators.required, Validators.minLength(1)]],
    instituteRegions: [[], [Validators.required, Validators.minLength(1)]],
    intended: ['', [Validators.required, Validators.minLength(3)]],
  });

  constructor(
    public _servicesVariables: ServicesTermsService,
    private fb: FormBuilder,
  ) {}

  setButtonIcon() {
    if (this.isLoading) {
      return 'pi pi-spin pi-spinner';
    }

    return this._servicesVariables.continue ? 'pi pi-check' : 'pi pi-arrow-right';
  }

  nextStep() {
    if (this.validEmail()) {
      this.emailError = true;
      return;
    }

    if (this._servicesVariables.continue && this.formData.invalid) {
      this.formData.markAllAsTouched();
      return;
    }

    if (this._servicesVariables.continue && this.formData.valid) {
      this.saveEmail();
    }

    this._servicesVariables.continue = true;
    this.emailError = false;
  }

  isValidRequired(field: string) {
    return (
      this.formData.controls[field].getError('required') && this.formData.controls[field].touched
    );
  }

  isValidLength(field: string) {
    return (
      this.formData.controls[field].getError('minlength') && this.formData.controls[field].touched
    );
  }

  validEmail() {
    const email = this.email;

    const regex = new RegExp('[^@ \t\r\n]+@[^@ \t\r\n]+\\.[^@ \t\r\n]+');

    if (regex.test(email)) {
      return false;
    }

    return true;
  }

  goBack() {
    if (!this._servicesVariables.continue && this._servicesVariables.termsConditions) {
      this._servicesVariables.termsConditions = false;

      return;
    }

    this._servicesVariables.continue = false;
    this._servicesVariables.termsConditions = true;
  }

  skipSection() {
    this._servicesVariables.continue = true;
    this._servicesVariables.termsConditions = false;
  }

  saveEmail() {
    this.isLoading = true;
    this.formData.disable();

    const interestRegions = this.formData.get('interestRegions').value.map((region: any) => {
      return { ...region, scope: 'researchRegion' };
    });

    const instituteRegions = this.formData.get('instituteRegions').value.map((region: any) => {
      return { ...region, scope: 'instituteRegion' };
    });

    const region = interestRegions.concat(instituteRegions);

    this._servicesVariables
      .postregisterdowload({
        ...this.formData.value,
        region,
        email: this.email,
        guiades: this.tools,
        app_id: this.app_id,
      })
      .subscribe({
        next: (data) => {
          this._servicesVariables.termsConditions = false;
          this.isLoading = false;

          console.log(data);
        },
        error: (error) => {
          console.error(error);
          this.isLoading = false;
        },
      });
  }
}
