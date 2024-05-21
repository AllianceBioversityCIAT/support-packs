import { Component, OnInit } from '@angular/core';
import { ServicesLearningZoneService } from '../../services/services-learning-zone.service';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

interface IThematicAreas {
  id: number;
  name: string;
  app_id: number;
}
@Component({
  selector: 'app-form-request',
  templateUrl: './form-request.component.html',
  styleUrls: ['./form-request.component.scss'],
})
export class FormRequestComponent implements OnInit {
  step1: boolean = true;
  step2: boolean = false;
  loadingSave: boolean = false;
  dialogConfirmation: boolean = false;

  thematicAreasData: IThematicAreas[] = [];

  optionsImportance = [];
  categories = [];

  requestToolNewForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    source: ['', [Validators.required]],
    description: ['', [Validators.required]],
    target_scale: ['', [Validators.required]],
    integrates_gender: ['', [Validators.required]],
    participants: ['', [Validators.required]],
    methods: ['', [Validators.required]],
    input_types: ['', [Validators.required]],
    expected_outputs: ['', [Validators.required]],
    human_resources: ['', [Validators.required]],
    estimated_time: ['', [Validators.required]],
    strengths: ['', [Validators.required]],
    limitations: ['', [Validators.required]],
    is_tested_online: ['', [Validators.required]],
    key_references: ['', [Validators.required]],
    category_id: ['', [Validators.required]],
    A: this.fb.group({
      design: ['', [Validators.required]],
      implementation: ['', [Validators.required]],
      monitoring: ['', [Validators.required]],
    }),
    R: this.fb.group({
      design: ['', [Validators.required]],
      implementation: ['', [Validators.required]],
      monitoring: ['', [Validators.required]],
    }),
    TS: this.fb.group({
      design: ['', [Validators.required]],
      implementation: ['', [Validators.required]],
      monitoring: ['', [Validators.required]],
    }),
    resource: this.fb.array([
      this.fb.group({
        name: ['', [Validators.required]],
        source: ['', [Validators.required]],
        type: ['', [Validators.required]],
      }),
    ]),
  });

  constructor(
    private _servicesLearningZoneService: ServicesLearningZoneService,
    private fb: FormBuilder,
  ) {}

  get resources() {
    return this.requestToolNewForm.get('resource') as FormArray;
  }

  ngOnInit() {
    this.getAllFilters();
    this.optionsImportance = [
      {
        name: 'Very important',
      },
      {
        name: 'Important',
      },
      {
        name: 'Useful',
      },
      {
        name: 'Optional',
      },
    ];
    this.categories = [
      {
        name: 'Articles and books',
      },
      {
        name: 'Training materials',
      },
      {
        name: 'Reports and other publications',
      },
      {
        name: 'Data, models and tools',
      },
      {
        name: 'Governanace administation and management',
      },
      {
        name: 'Outreach products',
      },
    ];
  }

  isValidRequired(field: string) {
    return (
      this.requestToolNewForm.controls[field].getError('required') &&
      this.requestToolNewForm.controls[field].touched
    );
  }

  getAllFilters() {
    this._servicesLearningZoneService.getSPFilters().subscribe((data) => {
      this.thematicAreasData = data.result.categories;
    });
  }

  button1Validations() {
    this.step1 = true;
    this.step2 = false;
  }

  button2Validations() {
    this.step1 = false;
    this.step2 = true;
  }

  aditionalResource() {
    this.resources.push(
      this.fb.group({
        name: ['', [Validators.required]],
        source: ['', [Validators.required]],
        type: this.fb.group({
          name: ['', [Validators.required]],
        }),
      }),
    );
  }

  deleteResource(index: number) {
    this.resources.removeAt(index);
  }

  async postRequestTool() {
    if (this.requestToolNewForm.invalid) {
      return;
    }

    this.loadingSave = true;

    this._servicesLearningZoneService
      .createRequestNewTool(this.requestToolNewForm.getRawValue())
      .subscribe({
        next: (data) => {
          console.log(data);
          this.requestToolNewForm.reset();
          this.step1 = true;
          this.step2 = false;
          this.loadingSave = false;
        },
        error: (error) => {
          console.log(error);
          this.loadingSave = false;
        },
      });
  }
}
