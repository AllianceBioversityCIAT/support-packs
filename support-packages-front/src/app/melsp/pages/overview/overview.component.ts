import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../shared/services/shared.service';

import { InputTextModule } from 'primeng/inputtext';
import { SharedModule } from 'primeng/api';
import { TableModule } from 'primeng/table';

interface Tool {
  category_id: number;
  id: number;
  name: string;
  cate_name: string;
  resources: Resource[];
  source: string;
  type: string;
}

interface Resource {
  acronym: string;
  name: string;
  importance_level: 'Very important' | 'Important' | 'Useful' | 'Optional';
  category_id: number;
  id: number;
  role_id: number;
}

interface Importance {
  importanceLevel: number;
  styleColor: string;
}

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
    standalone: true,
    imports: [
    TableModule,
    SharedModule,
    InputTextModule
],
})
export class OverviewComponent implements OnInit {
  overviewTools: Tool[] = [];
  loading: boolean = true;

  constructor(public _sharedService: SharedService) {}

  ngOnInit(): void {
    this.getInformation();
  }

  getIconByType(type: string) {
    switch (type) {
      case '0':
        return 'pi pi-file';
      case '1':
        return 'pi pi-youtube';
      case '2':
        return '';
      default:
        return '';
    }
  }

  getIconByTypeDownload(type: string) {
    switch (type) {
      case '0':
        return 'pi pi-download';
      case '1':
        return 'pi pi-link';
      case '2':
        return 'pi pi-link';
      default:
        return '';
    }
  }

  getInformation(): void {
    this._sharedService.getToolOverview(2).subscribe((data: { result: Tool[] }) => {
      this.overviewTools = data.result;
      this.loading = false;
    });
  }

  getImportants(data: Resource): Importance {
    let importanceLevel = 0;
    let styleColor = '';

    if (data) {
      switch (data.importance_level) {
        case 'Very important':
          importanceLevel = 4;
          styleColor = 'veryImportant';
          break;
        case 'Important':
          importanceLevel = 3;
          styleColor = 'important';
          break;
        case 'Useful':
          importanceLevel = 2;
          styleColor = 'useful';
          break;
        case 'Optional':
          importanceLevel = 1;
          styleColor = 'optional';
          break;
      }
    }

    return { importanceLevel, styleColor };
  }
}
