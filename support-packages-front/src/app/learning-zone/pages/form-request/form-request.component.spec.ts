import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormRequestComponent } from './form-request.component';
import { ServicesLearningZoneService } from '../../services/services-learning-zone.service';
import { SharedService } from '../../../shared/services/shared.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { DialogModule } from 'primeng/dialog';

describe('FormRequestComponent', () => {
  let component: FormRequestComponent;
  let fixture: ComponentFixture<FormRequestComponent>;
  let mockLearningZoneService;
  let mockSharedService;

  beforeEach(() => {
    mockLearningZoneService = {
      createRequestNewTool: jest.fn().mockReturnValue(of({})),
    };

    mockSharedService = {
      getSPFilters: jest.fn().mockReturnValue(
        of({
          result: {
            categories: [{ id: 1, name: 'Category 1' }],
          },
        }),
      ),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: ServicesLearningZoneService, useValue: mockLearningZoneService },
        { provide: SharedService, useValue: mockSharedService },
        FormBuilder,
      ],
      imports: [ReactiveFormsModule, DialogModule],
    });

    fixture = TestBed.createComponent(FormRequestComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form and load filters on ngOnInit', () => {
    jest.spyOn(component, 'getAllFilters');
    component.ngOnInit();
    expect(component.getAllFilters).toHaveBeenCalled();
    expect(component.optionsImportance.length).toBe(4);
    expect(component.categories.length).toBe(6);
  });

  it('should validate required fields', () => {
    component.requestToolNewForm.controls['name'].markAsTouched();
    expect(component.isValidRequired('name')).toBe(true);
    component.requestToolNewForm.controls['name'].setValue('Test');
    expect(component.isValidRequired('name')).toBeNull();
  });

  it('should get all filters and update thematic areas', () => {
    component.getAllFilters();
    expect(component.thematicAreasData.length).toBe(1);
  });

  it('should toggle step validation states', () => {
    component.button1Validations();
    expect(component.step1).toBe(true);
    expect(component.step2).toBe(false);

    component.button2Validations();
    expect(component.step1).toBe(false);
    expect(component.step2).toBe(true);
  });

  it('should add and remove additional resource', () => {
    expect(component.resources.length).toBe(1);
    component.aditionalResource();
    expect(component.resources.length).toBe(2);
    component.deleteResource(1);
    expect(component.resources.length).toBe(1);
  });

  it('should post request tool and reset form on success', async () => {
    component.requestToolNewForm.patchValue({
      name: 'Test Tool',
      email: 'test@example.com',
      source: 'Test Source',
      description: 'Test Description',
      target_scale: 'Test Scale',
      integrates_gender: 'Yes',
      participants: 'Test Participants',
      methods: 'Test Methods',
      input_types: 'Test Inputs',
      expected_outputs: 'Test Outputs',
      human_resources: 'Test Resources',
      estimated_time: 'Test Time',
      strengths: 'Test Strengths',
      limitations: 'Test Limitations',
      is_tested_online: 'Yes',
      key_references: 'Test References',
      category_id: '1',
      A: {
        design: 'Important',
        implementation: 'Useful',
        monitoring: 'Optional',
      },
      R: {
        design: 'Important',
        implementation: 'Useful',
        monitoring: 'Optional',
      },
      TS: {
        design: 'Important',
        implementation: 'Useful',
        monitoring: 'Optional',
      },
      resource: [
        {
          name: 'Test Resource',
          source: 'Test Source',
          type: 'Test Type',
        },
      ],
    });

    await component.postRequestTool();

    expect(component.loadingSave).toBe(false);
    expect(component.step1).toBe(true);
    expect(component.step2).toBe(false);
    expect(component.requestToolNewForm.valid).toBe(false);
  });

  it('should not post request tool if form is invalid', async () => {
    component.requestToolNewForm.patchValue({
      name: '',
      email: '',
      source: '',
      description: '',
      target_scale: '',
      integrates_gender: '',
      participants: '',
      methods: '',
      input_types: '',
      expected_outputs: '',
      human_resources: '',
      estimated_time: '',
      strengths: '',
      limitations: '',
      is_tested_online: '',
      key_references: '',
      category_id: '',
      A: {
        design: '',
        implementation: '',
        monitoring: '',
      },
      R: {
        design: '',
        implementation: '',
        monitoring: '',
      },
      TS: {
        design: '',
        implementation: '',
        monitoring: '',
      },
    });

    await component.postRequestTool();
    expect(component.loadingSave).toBe(false);
    expect(mockLearningZoneService.createRequestNewTool).not.toHaveBeenCalled();
  });
});
