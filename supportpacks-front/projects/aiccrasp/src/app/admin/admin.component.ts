import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AiccraToolsService } from '../services/aiccra-tools.service';
import { RequestTool } from './interfaces/request-tool.inteface';
import autosize from 'autosize';
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
    fullname: "Santiago Gálvez Lasso",
    email: "santiagogalvez17@gmail.com",
    toolName: "My new",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    link: "www.google.com",
    estimated_time: "3 Months",
    integrates_gender: null,
    is_tested_online: null,
    target_scale: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    participants: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem dolor sed viverra ipsum. Erat velit scelerisque in dictum non. Adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla.",
    methods: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    input_types: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    limitations: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem dolor sed viverra ipsum. Erat velit scelerisque in dictum non. Adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla.",
    strengths: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem dolor sed viverra ipsum. Erat velit scelerisque in dictum non. Adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla.",
    expected_outputs: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem dolor sed viverra ipsum. Erat velit scelerisque in dictum non. Adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla.",
    human_resources: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem dolor sed viverra ipsum. Erat velit scelerisque in dictum non. Adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla.",
    key_references: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem dolor sed viverra ipsum. Erat velit scelerisque in dictum non. Adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla.",
    thematicArea: 2,
    importanceResearcher: { design: null, implementation: null, me: null },
    importanceTechnical: { design: null, implementation: null, me: null },
    importanceAcademia: { design: null, implementation: null, me: null },
    resources: [
      {
        resourceName: "Lorem ipsum",
        resourceLink: "Lorem ipsum",
        resourceCategory: "Training materials"
      }
    ]
  };

  // requestTool: RequestTool = {
  //   fullname: null,
  //   email: null,
  //   toolName: null,
  //   description: null,
  //   link: null,
  //   estimated_time: null,
  //   integrates_gender: null,
  //   is_tested_online: null,
  //   target_scale: null,
  //   participants: null,
  //   methods: null,
  //   input_types: null,
  //   limitations: null,
  //   strengths: null,
  //   expected_outputs: null,
  //   human_resources: null,
  //   key_references: null,
  //   thematicArea: null,
  //   importanceResearcher: { design: null, implementation: null, me: null },
  //   importanceTechnical: { design: null, implementation: null, me: null },
  //   importanceAcademia: { design: null, implementation: null, me: null },
  //   resources: []
  // };

  newResource = {
    resourceName: null,
    resourceLink: null,
    resourceCategory: null
  }

  formDisabled: boolean = true;

  @ViewChild('toolForm', null) toolForm!: NgForm;

  constructor(private aiccraToolsService: AiccraToolsService) {

  }

  ngOnInit() {
    this.getThematicAreas();
    autosize(document.querySelectorAll('textarea'));
  }


  getThematicAreas() {
    this.aiccraToolsService.getSPAreas().subscribe( res => {
      this.thematicAreas = res;
    })
  }

  setintegrates_gender(value: boolean) {
    this.requestTool.integrates_gender = value;
  }
  setis_tested_online(value: boolean) {
    this.requestTool.is_tested_online = value;
  }

  addResource() {
    console.log(this.toolForm);
    if(this.validateField(this.toolForm.controls.resourceName.value)
      && this.validateField(this.toolForm.controls.resourceLink.value)
      && this.validateField(this.toolForm.controls.resourceCategory.value)) {
        this.requestTool.resources.push({
          resourceName: this.toolForm.controls.resourceName.value, 
          resourceLink: this.toolForm.controls.resourceLink.value,
          resourceCategory: this.toolForm.controls.resourceCategory.value
        });
      this.toolForm.controls.resourceName.reset();
       this.toolForm.controls.resourceLink.reset();
       this.toolForm.controls.resourceCategory.reset();
    }

  }

  validateField(field){
    if(field != null && field != '') return true;
    return false;
  }

  deleteResource(index) {
    this.requestTool.resources.splice(index, 1);
  }

  saveTool() {
    console.log('Saving tool', this.requestTool);
    this.aiccraToolsService.requestTool(this.requestTool).subscribe(res => {
      console.log(res);
      this.toolForm.reset();
      this.requestTool.resources = [];
    }
    )
  }

  enableForm() {
    this.formDisabled = false;
  }
}
