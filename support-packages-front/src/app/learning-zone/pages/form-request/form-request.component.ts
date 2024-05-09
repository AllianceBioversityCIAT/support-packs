import { Component, OnInit } from '@angular/core';
import { ServicesLearningZoneService } from '../../services/services-learning-zone.service';
import { RequestNewTool } from './models/requestNewTool';

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

  requestToolNew = new RequestNewTool();

  constructor(private _servicesLearningZoneService: ServicesLearningZoneService) {}

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
    this.requestToolNew.resource.push({
      name: '',
      source: '',
      type: { name: '' },
    });
  }

  deleteResource(index: number) {
    this.requestToolNew.resource.splice(index, 1);
  }

  async postRequestTool() {
    this.loadingSave = true;

    this._servicesLearningZoneService
      .createRequestNewTool(this.requestToolNew)
      .subscribe((data) => {
        console.log(data);

        this.requestToolNew = new RequestNewTool();
        this.step1 = true;
        this.step2 = false;
        this.loadingSave = false;
      });
  }
}
