import { Component, OnInit } from '@angular/core';
import { AiccraToolsService } from '../services/aiccra-tools.service';
import { RequestTool } from './interfaces/request-tool.inteface';

const resourceTypes = [
  'Articles and books',
  'Training materials',
  'Reports and other publications',
  'Data, models and tools',
  'Governance administration and management',
  'Outreach products',
];

const importanceLevels = [
  'Very important',
  'Important',
  'Useful',
  'Optional',
  'N/A'
]


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  thematicAreas = [];
  resourceTypes = resourceTypes;
  importanceLevels = importanceLevels;
  requestTool: RequestTool = {
    fullname: "Santiago",
    email: null,
    toolName: null,
    description: null,
    link: null,
    estimatedTime: null,
    integratesGender: true,
    isTestedOnline: null,
    targetScale: null,
    participants: null,
    methodsUsed: null,
    dataTypes: null,
    limitations: null,
    strenghts: null,
    thematicArea: null,
    importanceResearcher: { design: null, implementation: null, me: null },
    importanceTechnical: { design: null, implementation: null, me: null },
    importanceAcademia: { design: null, implementation: null, me: null },
    resources: [
      {
        resourceName: "My first resource",
        resourceLink: "Mi first link",
        resourceCategory: null
      },
      {
        resourceName: "My second resource",
        resourceLink: "Mi second link",
        resourceCategory: null
      }
    ]
  };

  constructor(private aiccraToolsService: AiccraToolsService) {

  }

  ngOnInit() {
    this.getThematicAreas();
  }


  getThematicAreas() {
    this.aiccraToolsService.getSPAreas().subscribe( res => {
      this.thematicAreas = res;
    })
  }

  setIntegratesGender(value: boolean) {
    this.requestTool.integratesGender = value;
  }
  setIsTestedOnline(value: boolean) {
    this.requestTool.isTestedOnline = value;
  }

  addResource() {

  }
  deleteResource(index) {
    this.requestTool.resources.splice(index, 1);
  }

  saveTool() {
    console.log('Saving tool', this.requestTool);
  }
}
