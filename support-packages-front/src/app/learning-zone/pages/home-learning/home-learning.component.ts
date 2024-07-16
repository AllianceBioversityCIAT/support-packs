import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProduct, ServicesTermsService } from '../../../shared/services/services-terms.service';

import * as html2pdf from 'html-to-pdf-js';
import { SharedService } from '../../../shared/services/shared.service';
import { AccordionModule } from 'primeng/accordion';
import { TermsConditionsComponent } from '../../../shared/terms-conditions/terms-conditions.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { LucideAngularModule } from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { SharedModule } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { NgStyle } from '@angular/common';

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
    standalone: true,
    imports: [
    DropdownModule,
    FormsModule,
    SharedModule,
    NgStyle,
    RouterLink,
    LucideAngularModule,
    TableModule,
    ButtonModule,
    TermsConditionsComponent,
    AccordionModule
],
})
export class HomeLearningComponent implements OnInit, OnDestroy {
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
    this.selectedProducts = [];
  }

  downloadPDF() {
    const opt = {
      margin: 0.5,
      filename: 'AICCRA-Tools.pdf',
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 1 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
    const element = document.getElementById('pdfSection');
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
    this._servicesVariables.searchedTools = false;
    this._servicesVariables.selectedProducts = [];

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

  ngOnDestroy() {
    this._servicesVariables.resetValues();
  }
}
