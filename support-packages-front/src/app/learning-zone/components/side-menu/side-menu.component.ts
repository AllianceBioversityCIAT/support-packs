import { Component, OnInit } from '@angular/core';
import { ServicesLearningZoneService } from '../../services/services-learning-zone.service';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { ServicesTermsService } from '../../../shared/services/services-terms.service';

interface IResource {
  id: number;
  active: number;
  name: string;
  code: string;
  source: string;
  type: string;
  guideline_id: number;
}

interface ITools {
  id: number;
  name: string;
  source: string;
  contact: string;
  description: string;
  target_scale: string;
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
  resources: IResource[];
}

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  toolsData: ITools[] = [];
  loading = true;
  visible: boolean = false;
  menuItems: MenuItem[] | undefined;
  overviewFirstRow = [
    {
      id: 'Design',
      name: 'Design',
    },
    {
      id: 'Implementation',
      name: 'Implementation',
    },
    {
      id: 'Monitoring and Evaluation',
      name: 'Monitoring and Evaluation',
    },
  ];
  overviewSecondRow = [
    {
      id: 'id',
      name: 'ID',
    },
    {
      id: 'name',
      name: 'Name',
    },
    {
      id: 'R1',
      name: 'R',
    },
    {
      id: 'target_scale1',
      name: 'TS',
    },
    {
      id: 'acronym1',
      name: 'A',
    },
    {
      id: 'R2',
      name: 'R',
    },
    {
      id: 'target_scale2',
      name: 'TS',
    },
    {
      id: 'acronym2',
      name: 'A',
    },
    {
      id: 'R3',
      name: 'R',
    },
    {
      id: 'target_scale3',
      name: 'TS',
    },
    {
      id: 'acronym3',
      name: 'A',
    },
  ];
  sidebarLinks = [
    {
      name: 'AICCRA Learning Zone',
      url: '/aiccra/learning-zone',
      icon: PrimeIcons.HOME,
    },
    {
      name: 'Submission Form',
      url: '/aiccra/form-request',
      icon: PrimeIcons.FILE,
    },
    {
      name: 'FAQ',
      url: '/aiccra/FAQ',
      icon: PrimeIcons.QUESTION_CIRCLE,
    },
    {
      name: 'Manage Tool',
      url: '/aiccra/manage-tool',
      icon: PrimeIcons.USER_EDIT,
    },
  ];

  constructor(
    private _servicesLearningZoneService: ServicesLearningZoneService,
    public _servicesVariables: ServicesTermsService,
  ) {}

  ngOnInit(): void {
    this.getInformation();
    this.menuItems = [
      {
        label: 'AICCRA Learning Zone',
        icon: PrimeIcons.HOME,
        routerLink: ['/aiccra/learning-zone'],
      },
      {
        label: 'Submission Form',
        icon: PrimeIcons.FILE,
        routerLink: ['/aiccra/form-request'],
      },
      {
        label: 'FAQ',
        icon: PrimeIcons.QUESTION_CIRCLE,
        routerLink: ['/aiccra/FAQ'],
      },
      {
        label: 'Manage Tool',
        icon: PrimeIcons.USER_EDIT,
        routerLink: ['/aiccra/manage-tool'],
      },
    ];
  }

  showDialog() {
    this.visible = true;
  }

  getInformation() {
    this._servicesLearningZoneService.getToolOverview().subscribe((data) => {
      this.toolsData = data.result;
      this.loading = false;
    });
  }

  getImportants(acronym: string, proposal: string, data: any, id: any) {
    const importanceLevels = {
      'Very important': { level: 4, style: 'veryImportant' },
      Important: { level: 3, style: 'important' },
      Useful: { level: 2, style: 'useful' },
      Optional: { level: 1, style: 'optional' },
    };

    const filteredData = data.filter(
      (item: any) => item.acronym === acronym && item.name === proposal,
    );

    if (filteredData.length > 0) {
      const importanceLevel = filteredData[0].importance_level;
      if (importanceLevels.hasOwnProperty(importanceLevel)) {
        const { level, style } = importanceLevels[importanceLevel];
        return { important: level, styleColor: style };
      }
    }

    return { important: 0, styleColor: '' };
  }
}
