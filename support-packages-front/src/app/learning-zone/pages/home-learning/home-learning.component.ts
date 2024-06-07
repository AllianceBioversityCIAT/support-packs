import { Component, OnInit } from '@angular/core';
import { ServicesTermsService } from '../../../shared/services/services-terms.service';

import * as html2pdf from 'html-to-pdf-js';
import { SharedService } from '../../../shared/services/shared.service';

interface IThematicAreas {
  id: number;
  name: string;
  app_id: number;
}

interface ITargetUser {
  id: number;
  name: string;
  app_id: number;
  acronym: string;
}

interface IProjectPhase {
  id: number;
  name: string;
  app_id: number;
  description: string;
}

interface IProduct {
  id: number;
  name: string;
  source: string;
  contact: null;
  description: string;
  target_scale: string;
  integrates_gender: string;
  participants: string;
  methods: string;
  input_types: string;
  expected_outputs: string;
  human_resources: string;
  estimated_time: string;
  strengths: string;
  limitations: string;
  key_references: string;
  importance_level: string;
  role_name: string;
  cate_name: string;
  staga_name: string;
  code: string;
  id_cat: number;
  id_rol: number;
  id_stage: number;
  resources: Resource[];
}

interface Resource {
  id: number;
  active: number;
  name: string;
  code: string;
  source: string;
  type: string;
  guideline_id: number;
}

@Component({
  selector: 'app-home-learning',
  templateUrl: './home-learning.component.html',
  styleUrls: ['./home-learning.component.scss'],
})
export class HomeLearningComponent implements OnInit {
  thematicAreasData: IThematicAreas[] = [];
  selectedThematicAreas: IThematicAreas;

  targetUserData: ITargetUser[] = [];
  selectedTargetUser: ITargetUser;

  projectPhaseData: IProjectPhase[] = [];
  selectedProjectUser: IProjectPhase;

  productsData: IProduct[] = [];
  selectedProducts: IProduct[] = [];
  backInfo: IProduct[] = [];

  constructor(
    public _servicesVariables: ServicesTermsService,
    public _sharedService: SharedService,
  ) {}

  ngOnInit() {
    this.getAllTools();
    this.getAllFilters();
  }

  goBackToTable() {
    this._servicesVariables.termsConditions = false;
    this._servicesVariables.continue = false;
  }

  downloadPDF() {
    const opt = {
      margin: 0.5,
      filename: 'AICCRA-Tools.pdf',
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 1 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
    let element = document.getElementById('pdfSection');
    html2pdf().from(element).set(opt).save();
  }

  getAllFilters() {
    this._sharedService.getSPFilters(3).subscribe((data) => {
      this.thematicAreasData = data.result.categories;
      this.targetUserData = data.result.roles;
      this.projectPhaseData = data.result.stage;
    });
  }

  getAllTools() {
    this._sharedService.getAllTools(3).subscribe((data) => {
      this.productsData = data.result;
      this.backInfo = data.result;
    });
  }

  disableButton() {
    return (
      this.thematicAreasData.length === 0 ||
      this.targetUserData.length === 0 ||
      this.projectPhaseData.length === 0
    );
  }

  filterInformation() {
    this.productsData = this.backInfo;
    this.selectedProducts = [];

    if (this.selectedThematicAreas && this.selectedTargetUser && this.selectedProjectUser) {
      this.productsData = this.productsData.filter((data) => {
        return (
          data.id_cat === this.selectedThematicAreas.id &&
          data.id_rol === this.selectedTargetUser.id &&
          data.id_stage === this.selectedProjectUser.id
        );
      });

      this.productsData.sort((a, b) => {
        const importanceOrder = ['Very important', 'Important', 'Useful', 'Optional'];
        return (
          importanceOrder.indexOf(a.importance_level) - importanceOrder.indexOf(b.importance_level)
        );
      });
    }
  }

  getImportanceLevelColor(importance: string) {
    switch (importance) {
      case 'Very important':
        return '#009875';
      case 'Important':
        return '#06AEAD';
      case 'Useful':
        return '#72CC50';
      case 'Optional':
        return '#C2C2C2';
      default:
        return 'Low';
    }
  }

  initNewSearch() {
    this.selectedThematicAreas = undefined;
    this.selectedTargetUser = undefined;
    this.selectedProjectUser = undefined;
    this.productsData = this.backInfo;
    this.selectedProducts = [];
  }

  ngOnDestroy() {
    this._servicesVariables.resetValues();
  }
}
