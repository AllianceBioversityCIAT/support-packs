import { Component, OnInit } from '@angular/core';
import { ServicesMelService } from '../../services/services-mel.service';

interface Sale {
  category_id: number;
  id: number;
  name: string;
  cate_name: string;
  resources: Resource[];
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
})
export class OverviewComponent implements OnInit {
  sales: Sale[] = [];
  loading: boolean = true;

  constructor(private _servicesMelspService: ServicesMelService) {}

  ngOnInit(): void {
    this.getInformation();
  }

  getInformation(): void {
    this._servicesMelspService.getToolOverview().subscribe((data: { result: Sale[] }) => {
      this.sales = data.result;
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
