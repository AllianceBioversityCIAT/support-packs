import { Component, OnDestroy, OnInit } from '@angular/core';
import { ServicesTermsService } from '../../../shared/services/services-terms.service';
import { SharedService } from '../../../shared/services/shared.service';
import { PdfGenerateComponent } from '../../../shared/pdf-generate/pdf-generate.component';
import { TermsConditionsComponent } from '../../../shared/terms-conditions/terms-conditions.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { NgStyle } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

interface IRole {
  id: number;
  name: string;
  acronym: string;
  app_id: number;
  img: string;
}

interface IWhen {
  id: number;
  name: string;
  app_id: number;
}

interface IWhat {
  id: number;
  name: string;
  description: string;
  app_id: number;
}

interface IProduct {
  active: number;
  app_id: number;
  category_id: number;
  code: string;
  contact: string;
  createdAt: string;
  guideline_id: number;
  id: number;
  importance_level: string;
  name: string;
  registered_by: string;
  role_id: number;
  source: string;
  stage_id: number;
  type: string;
  updatedAt: string;
}

@Component({
    selector: 'app-home-mel',
    templateUrl: './home-mel.component.html',
    styleUrls: ['./home-mel.component.scss'],
    standalone: true,
    imports: [
    DropdownModule,
    FormsModule,
    SharedModule,
    NgStyle,
    TableModule,
    ButtonModule,
    TermsConditionsComponent,
    PdfGenerateComponent
],
})
export class HomeMelComponent implements OnInit, OnDestroy {
  productsData: IProduct[];

  selectedProducts: IProduct[] = [];

  backInfo: IProduct[];

  rolesData: IRole[] = [];
  selectedRole: IRole | null = null;

  whenData: IWhen[] = [];
  selectedWhen: IWhen | null = null;

  whatData: IWhat[] = [];
  selectedWhat: IWhat | null = null;

  constructor(
    public _servicesVariables: ServicesTermsService,
    public _sharedService: SharedService,
  ) {}

  ngOnInit(): void {
    this.getFilters();
    this.getTools();
  }

  getIconByType(type: string) {
    switch (type) {
      case '0':
        return 'pi pi-file';
      case '1':
        return 'pi pi-youtube';
      case '2':
        return 'pi pi-paperclip';
      default:
        return '';
    }
  }

  validateShowPdfButton() {
    return {
      showPdfButton: this.selectedProducts.some((product) => product.type === '0'),
      ToolsType0: this.selectedProducts.filter((product) => product.type === '0'),
      buttonMessage:
        this.selectedProducts.filter((product) => product.type === '0').length > 1
          ? `Download [${this.selectedProducts.filter((product) => product.type === '0').length}] Files`
          : 'Download File',
    };
  }

  getFilters() {
    this._sharedService.getSPFilters(2).subscribe((data) => {
      this.whatData = data.result.categories;
      this.rolesData = data.result.roles;
      this.whenData = data.result.stage;

      this.rolesData.forEach((data: any) => {
        data.img = `../../../../assets/roles/${data.id}.png`;
      });
    });
  }

  getTools() {
    this._sharedService.getAllTools(2).subscribe((data) => {
      this.productsData = data.result;
      this.backInfo = data.result;
    });
  }

  filterInformation() {
    this.productsData = this.backInfo;
    this._servicesVariables.termsConditions = false;
    this._servicesVariables.continue = false;
    this.selectedProducts = [];

    if (this.selectedRole && this.selectedWhen && this.selectedWhat) {
      this.productsData = this.productsData.filter((data) => {
        return (
          data.category_id === this.selectedWhat.id &&
          data.role_id === this.selectedRole.id &&
          data.stage_id === this.selectedWhen.id
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
    this._servicesVariables.continue = false;
    this._servicesVariables.termsConditions = false;
    this.selectedRole = null;
    this.selectedWhat = null;
    this.selectedWhen = null;
    this.selectedProducts = [];
  }

  ngOnDestroy() {
    this._servicesVariables.resetValues();
  }
}
