import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TermsConditionsComponent } from './terms-conditions.component';
import { ServicesTermsService } from '../services/services-terms.service';
import { FormArray, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('TermsConditionsComponent', () => {
  let component: TermsConditionsComponent;
  let fixture: ComponentFixture<TermsConditionsComponent>;
  let mockServicesTermsService;
  let fb: FormBuilder;

  beforeEach(() => {
    mockServicesTermsService = {
      continue: false,
      termsConditions: false,
      getExistingUser: jest.fn(),
      postregisterdowload: jest.fn().mockReturnValue(of({ message: 'Success' })),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: ServicesTermsService, useValue: mockServicesTermsService },
        FormBuilder,
      ],
      imports: [ReactiveFormsModule, FormsModule],
    });

    fb = TestBed.inject(FormBuilder);
    fixture = TestBed.createComponent(TermsConditionsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add item to interestRegions and set errorInterestRegions to false when checkbox is checked', () => {
    const item = { id: 1, name: 'Region 1' };
    const event = { checked: [{ id: 1, name: 'Region 1' }] };

    component.onCheckboxChange(event, item, 'interestRegions');

    const selectedItems = component.formData.controls['interestRegions'].value as FormArray;
    expect(selectedItems.value).toContain(item);
    expect(component.errorInterestRegions).toBeFalsy();
  });

  it('should remove item from interestRegions and set errorInterestRegions to true when checkbox is unchecked and no items left', () => {
    const item = { id: 1, name: 'Region 1' };
    const event = { checked: [] };

    const selectedItems = component.formData.controls['interestRegions'].value as FormArray;
    selectedItems.push(fb.control(item)); // Add item initially

    component.onCheckboxChange(event, item, 'interestRegions');

    expect(selectedItems.value).not.toContain(item);
    expect(component.errorInterestRegions).toBeTruthy();
  });

  it('should not change errorInstituteRegions when working with interestRegions', () => {
    const item = { id: 1, name: 'Region 1' };
    const event = { checked: [[{ id: 1, name: 'Region 1' }]] };

    component.onCheckboxChange(event, item, 'interestRegions');

    expect(component.errorInstituteRegions).toBeFalsy();
  });

  it('should add item to instituteRegions and set errorInstituteRegions to false when checkbox is checked', () => {
    const item = { id: 1, name: 'Institute 1' };
    const event = { checked: [{ id: 1, name: 'Institute 1' }] };

    component.onCheckboxChange(event, item, 'instituteRegions');

    const selectedItems = component.formData.controls['instituteRegions'].value as FormArray;
    expect(selectedItems.value).toContain(item);
    expect(component.errorInstituteRegions).toBeFalsy();
  });

  it('should remove item from instituteRegions and set errorInstituteRegions to true when checkbox is unchecked and no items left', () => {
    const item = { id: 1, name: 'Institute 1' };
    const event = { checked: [] };

    const selectedItems = component.formData.controls['instituteRegions'].value as FormArray;
    selectedItems.push(fb.control(item));

    component.onCheckboxChange(event, item, 'instituteRegions');

    expect(selectedItems.value).not.toContain(item);
    expect(component.errorInstituteRegions).toBeTruthy();
  });

  it('should not change errorInterestRegions when working with instituteRegions', () => {
    const item = { id: 1, name: 'Institute 1' };
    const event = { checked: true };

    component.onCheckboxChange(event, item, 'instituteRegions');

    expect(component.errorInterestRegions).toBeFalsy();
  });

  it('should return correct button icon when loading', () => {
    component.isLoading = true;
    expect(component.setButtonIcon()).toBe('pi pi-spin pi-spinner');
  });

  it('should return correct button icon when not loading and continue is true', () => {
    component.isLoading = false;
    mockServicesTermsService.continue = true;
    expect(component.setButtonIcon()).toBe('pi pi-check');
  });

  it('should return correct button icon when not loading and continue is false', () => {
    component.isLoading = false;
    mockServicesTermsService.continue = false;
    expect(component.setButtonIcon()).toBe('pi pi-angle-right');
  });

  it('should validate email correctly', () => {
    component.email = 'test@example.com';
    expect(component.validEmail()).toBe(false);
    component.email = 'invalid-email';
    expect(component.validEmail()).toBe(true);
  });

  it('should mark email as invalid and set emailError to true on nextStep if email is invalid', () => {
    component.email = 'invalid-email';
    component.nextStep();
    expect(component.emailError.error).toBe(true);
    expect(component.emailError.message).toBe('Please enter a valid email address');
  });

  it('should handle next step correctly', () => {
    component.email = 'valid.email@example.com';
    component.formData.patchValue({
      first_name: 'John',
      last_name: 'Doe',
      institute: 'Institute',
      intended: 'test',
    });
    component.formData.controls['interestRegions'].setValue({ value: [{ id: 1, name: 'Test' }] });
    component.formData.controls['instituteRegions'].setValue({ value: [{ id: 2, name: 'Test' }] });

    mockServicesTermsService.continue = true;

    const spyDaveEmail = jest.spyOn(component, 'saveEmail');

    component.nextStep();

    expect(spyDaveEmail).toHaveBeenCalled();
  });

  it('should save email and set isLoading to true on nextStep if continue is true and form is valid', () => {
    mockServicesTermsService.continue = true;
    component.formData.patchValue({
      first_name: 'John',
      last_name: 'Doe',
      institute: 'Institute',
      interestRegions: [{ id: 1, name: 'Africa' }],
      instituteRegions: [{ id: 1, name: 'Africa' }],
      intended: 'Research',
    });
    component.formData.controls['interestRegions'].value.value = [{ id: 1, name: 'Africa' }];
    component.formData.controls['instituteRegions'].value.value = [{ id: 1, name: 'Africa' }];
    component.email = 'test@example.com';
    component.nextStep();
    expect(component.isLoading).toBe(false);
  });

  it('should reset continue and termsConditions on goBack if continue is false and termsConditions is true', () => {
    mockServicesTermsService.continue = false;
    mockServicesTermsService.termsConditions = true;
    component.goBack();
    expect(mockServicesTermsService.continue).toBe(false);
    expect(mockServicesTermsService.termsConditions).toBe(false);
  });

  it('should reset continue and set termsConditions to true on goBack if continue is true', () => {
    mockServicesTermsService.continue = true;
    component.goBack();
    expect(mockServicesTermsService.continue).toBe(false);
    expect(mockServicesTermsService.termsConditions).toBe(true);
  });

  it('should set continue to true and termsConditions to false on skipSection', () => {
    component.skipSection();
    expect(mockServicesTermsService.continue).toBe(true);
    expect(mockServicesTermsService.termsConditions).toBe(false);
  });

  it('should handle email saving correctly', () => {
    component.formData.patchValue({
      first_name: 'John',
      last_name: 'Doe',
      institute: 'Institute',
      interestRegions: [{ id: 1, name: 'Africa' }],
      instituteRegions: [{ id: 1, name: 'Africa' }],
      intended: 'Research',
    });
    component.formData.controls['interestRegions'].value.value = [{ id: 1, name: 'Africa' }];
    component.formData.controls['instituteRegions'].value.value = [{ id: 1, name: 'Africa' }];
    component.email = 'test@example.com';
    component.saveEmail();
    expect(component.isLoading).toBe(false);
    expect(component.formData.disabled).toBe(true);
  });

  it('should handle successful email saving', () => {
    jest
      .spyOn(mockServicesTermsService, 'postregisterdowload')
      .mockReturnValue(of({ message: 'Success' }));
    component.formData.patchValue({
      first_name: 'John',
      last_name: 'Doe',
      institute: 'Institute',
      interestRegions: [{ id: 1, name: 'Africa' }],
      instituteRegions: [{ id: 1, name: 'Africa' }],
      intended: 'Research',
    });
    component.formData.controls['interestRegions'].value.value = [{ id: 1, name: 'Africa' }];
    component.formData.controls['instituteRegions'].value.value = [{ id: 1, name: 'Africa' }];
    component.email = 'test@example.com';
    component.saveEmail();
    expect(mockServicesTermsService.postregisterdowload).toHaveBeenCalled();
    expect(component.isLoading).toBe(false);
  });

  it('should handle email saving errors correctly', () => {
    jest
      .spyOn(mockServicesTermsService, 'postregisterdowload')
      .mockReturnValue(throwError('Server error'));
    component.formData.patchValue({
      first_name: 'John',
      last_name: 'Doe',
      institute: 'Institute',
      interestRegions: [{ id: 1, name: 'Africa' }],
      instituteRegions: [{ id: 1, name: 'Africa' }],
      intended: 'Research',
    });
    component.formData.controls['interestRegions'].value.value = [{ id: 1, name: 'Africa' }];
    component.formData.controls['instituteRegions'].value.value = [{ id: 1, name: 'Africa' }];
    component.email = 'test@example.com';
    component.saveEmail();
    expect(component.isLoading).toBe(false);
  });

  it('should validate required fields correctly', () => {
    component.formData.controls['first_name'].markAsTouched();
    expect(component.isValidRequired('first_name')).toBe(true);
    component.formData.controls['first_name'].setValue('John');
    expect(component.isValidRequired('first_name')).toBeNull();
  });

  it('should validate field length correctly', () => {
    component.formData.controls['first_name'].markAsTouched();
    component.formData.controls['first_name'].setValue('Jo');
    expect(component.isValidLength('first_name')).toBe(true);
    component.formData.controls['first_name'].setValue('John');
    expect(component.isValidLength('first_name')).toBeNull();
  });
});
