import { Component, OnInit } from '@angular/core';
import { ServicesLearningZoneService } from '../../services/services-learning-zone.service';
import { ServicesTermsService } from '../../../shared/services/services-terms.service';

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

  productsData: any[] = [];
  selectedProducts: any[] = [];
  backInfo: any[] = [];

  constructor(
    private _servicesLearningZoneService: ServicesLearningZoneService,
    public _servicesVariables: ServicesTermsService,
  ) {}

  goBackToTable() {
    this._servicesVariables.termsConditions = false;
    this._servicesVariables.continue = false;
  }

  ngOnInit() {
    this.getAllTools();
    this.getAllFilters();
  }

  disableButton() {
    return (
      this.thematicAreasData.length === 0 ||
      this.targetUserData.length === 0 ||
      this.projectPhaseData.length === 0 ||
      this.productsData.length === 0
    );
  }

  filterInformation() {
    this.productsData = this.backInfo;

    if (this.selectedThematicAreas && this.selectedTargetUser && this.selectedProjectUser) {
      this.productsData = this.productsData.filter((data) => {
        return (
          data.id_cat === this.selectedThematicAreas.id &&
          data.id_rol === this.selectedTargetUser.id &&
          data.id_stage === this.selectedProjectUser.id
        );
      });
    }
  }

  getImportanceLevelColor(importance: string) {
    switch (importance) {
      case 'Very important':
        return '#c0504d';
      case 'Important':
        return '#c0504d';
      case 'Useful':
        return '#e6b8b7';
      case 'Optional':
        return '#d6d6d6';
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

  getAllFilters() {
    this._servicesLearningZoneService.getSPFilters().subscribe((data) => {
      this.thematicAreasData = data.result.categories;
      this.targetUserData = data.result.roles;
      this.projectPhaseData = data.result.stage;
    });
  }

  getAllTools() {
    this._servicesLearningZoneService.getAllTools().subscribe((data) => {
      this.productsData = data.result;
      this.backInfo = data.result;
    });
  }
}
