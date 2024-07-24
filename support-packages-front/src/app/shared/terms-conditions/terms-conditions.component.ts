import { Component, Input } from '@angular/core';
import { ServicesTermsService } from '../services/services-terms.service';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { NgStyle } from '@angular/common';

interface ICity {
  id: number;
  name: string;
}

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    NgStyle,
    ReactiveFormsModule,
    CheckboxModule,
    InputTextareaModule,
    ButtonModule,
  ],
})
export class TermsConditionsComponent {
  @Input() app_id: number;
  @Input() tools: any;

  isLoading = false;

  email = '';
  emailError = {
    error: false,
    message: '',
  };
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
    interestRegions: [this.fb.array([])],
    instituteRegions: [this.fb.array([])],
    intended: ['', [Validators.required, Validators.minLength(3)]],
  });

  errorInterestRegions = false;
  errorInstituteRegions = false;

  constructor(
    public _servicesVariables: ServicesTermsService,
    private fb: FormBuilder,
  ) {}

  onCheckboxChange(event: any, item: any, arrayName: string) {
    const selectedItems = this.formData.controls[arrayName].value as FormArray;

    if (event.checked.length > 0) {
      selectedItems.push(this.fb.control(item));

      if (arrayName === 'interestRegions') {
        this.errorInterestRegions = false;
      } else {
        this.errorInstituteRegions = false;
      }
    } else {
      const index = selectedItems.value.findIndex((x) => x.id === item.id);
      if (index !== -1) {
        selectedItems.removeAt(index);
      }

      if (selectedItems.length === 0) {
        if (arrayName === 'interestRegions') {
          this.errorInterestRegions = true;
        } else {
          this.errorInstituteRegions = true;
        }
      }
    }
  }

  setButtonIcon() {
    if (this.isLoading) {
      return 'pi pi-spin pi-spinner';
    }

    return this._servicesVariables.continue ? 'pi pi-check' : 'pi pi-angle-right';
  }

  nextStep() {
    if (this.validEmail()) {
      this.emailError = {
        error: true,
        message: 'Please enter a valid email address',
      };
      return;
    }

    if (this._servicesVariables.continue && this.formData.invalid) {
      this.formData.markAllAsTouched();

      if (this.formData.controls['interestRegions'].value.value.length === 0) {
        this.errorInterestRegions = true;
      }

      if (this.formData.controls['instituteRegions'].value.value.length === 0) {
        this.errorInstituteRegions = true;
      }

      return;
    }

    if (
      this._servicesVariables.continue &&
      this.formData.valid &&
      this.formData.controls['interestRegions'].value.value.length > 0 &&
      this.formData.controls['instituteRegions'].value.value.length > 0
    ) {
      this.saveEmail();
    }

    if (
      this.formData.get('first_name')?.value === '' &&
      this.formData.get('last_name')?.value === '' &&
      this.formData.get('institute')?.value === ''
    ) {
      this.isLoading = true;

      this._servicesVariables.getExistingUser(this.email).subscribe({
        next: (data) => {
          if (data.user) {
            this.formData.patchValue({
              first_name: data.user.first_name,
              last_name: data.user.last_name,
              institute: data.user.institute,
            });
          }
          this.isLoading = false;
          this._servicesVariables.continue = true;
        },
        error: (error) => {
          console.error(error);
          this.isLoading = false;
          this.emailError = {
            error: true,
            message: 'Something went wrong fetching user data, please try again later.',
          };
        },
      });
    } else {
      this._servicesVariables.continue = true;
    }
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

    this.errorInstituteRegions = false;
    this.errorInterestRegions = false;
    this.formData.markAsUntouched();
    this.formData.patchValue({
      first_name: '',
      last_name: '',
      institute: '',
      interestRegions: this.fb.array([]),
      instituteRegions: this.fb.array([]),
      intended: '',
    });

    this._servicesVariables.continue = false;
    this._servicesVariables.termsConditions = true;
  }

  skipSection() {
    this._servicesVariables.continue = true;
    this._servicesVariables.termsConditions = false;
  }

  saveEmail() {
    this.errorInterestRegions = false;
    this.errorInstituteRegions = false;
    this.isLoading = true;
    this.formData.disable();

    const interestRegions = this.formData.controls['interestRegions'].value.value.map(
      (region: any) => {
        return { ...region, scope: 'researchRegion' };
      },
    );

    const instituteRegions = this.formData.controls['instituteRegions'].value.value.map(
      (region: any) => {
        return { ...region, scope: 'instituteRegion' };
      },
    );

    const region = interestRegions.concat(instituteRegions);

    this._servicesVariables
      .postregisterdowload({
        ...this.formData.value,
        region,
        email: this.email,
        guiades: this.tools,
        app_id: this.app_id,
        interestRegions,
        instituteRegions,
      })
      .subscribe({
        next: (data) => {
          this._servicesVariables.termsConditions = false;
          this.isLoading = false;
        },
        error: (error) => {
          console.error(error);
          this.isLoading = false;
        },
      });
  }
}
