import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../shared/services/shared.service';
import { ServicesTermsService } from '../../../shared/services/services-terms.service';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { PdfGenerateComponent } from '../../../shared/pdf-generate/pdf-generate.component';
import { TermsConditionsComponent } from '../../../shared/terms-conditions/terms-conditions.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { SharedModule } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { NgClass, NgStyle } from '@angular/common';
import { RouterModule } from '@angular/router';

interface IRole {
  id: number;
  name: string;
  acronym: string;
  app_id: number;
  img: string;
  selected: boolean;
}

interface IWhen {
  id: number;
  name: string;
  app_id: number;
  description: string;
  selected: boolean;
}

interface IWhat {
  id: number;
  name: string;
  app_id: number;
  selected: boolean;
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
  selector: 'app-tools-results',
  templateUrl: './tools-results.component.html',
  styleUrls: ['./tools-results.component.scss'],
  animations: [
    trigger('rotate', [
      transition(
        'false => true',
        animate(
          '1s',
          keyframes([
            style({ transform: 'perspective(400px) rotateX(90deg)', opacity: 0 }),
            style({ transform: 'perspective(400px) rotateX(-20deg)', opacity: 1 }),
            style({ transform: 'perspective(400px) rotateX(10deg)', opacity: 1 }),
            style({ transform: 'perspective(400px) rotateX(-5deg)', opacity: 1 }),
            style({ transform: 'perspective(400px)', opacity: 1 }),
          ]),
        ),
      ),
    ]),
  ],
  standalone: true,
  imports: [
    NgClass,
    DropdownModule,
    FormsModule,
    SharedModule,
    TableModule,
    NgStyle,
    ButtonModule,
    TermsConditionsComponent,
    PdfGenerateComponent,
    RouterModule,
  ],
})
export class ToolsResultsComponent implements OnInit {
  productsData: IProduct[] = [];

  selectedProducts!: any;

  backInfo: any[] | null = [];

  rolesData: IRole[] = [];
  selectedRole: IRole | null = null;

  whenData: IWhen[] = [];
  selectedWhen: IWhen | null = null;

  whatData: IWhat[] = [];
  selectedWhat: IWhat | null = null;

  constructor(
    public _sharedService: SharedService,
    public _servicesVariables: ServicesTermsService,
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
          ? `Download Files [${this.selectedProducts.filter((product) => product.type === '0').length}]`
          : 'Download File',
    };
  }

  getFilters() {
    this._sharedService.getSPFilters(1).subscribe((data) => {
      this.whatData = data.result.categories;
      this.rolesData = data.result.roles;
      this.whenData = data.result.stage;

      this.rolesData.forEach((data: any) => {
        data.img = `../../../../assets/roles/${data.id}.png`;
        data.selected = false;
      });

      this.whatData.forEach((data: any) => {
        data.selected = false;
      });

      this.whenData.forEach((data: any) => {
        data.selected = false;
      });
    });
  }

  getTools() {
    this._sharedService.getAllTools(1).subscribe((data) => {
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
        return '#cc7876';
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
    this.whatData.forEach((data: any) => {
      data.selected = true;
    });
    this.whenData.forEach((data: any) => {
      data.selected = true;
    });
    this.rolesData.forEach((data: any) => {
      data.selected = true;
    });
    window.scrollTo(0, 0);
  }

  changesItemStatus(item, type) {
    if (type === 'role') {
      this.rolesData.map((data) => {
        data.selected = false;
      });
    }

    if (type === 'when') {
      this.whenData.map((data) => {
        data.selected = false;
      });
    }

    if (type === 'what') {
      this.whatData.map((data) => {
        data.selected = false;
      });
    }

    item.selected = true;
  }
}
