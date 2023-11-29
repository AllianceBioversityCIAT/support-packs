import { Component, OnInit } from '@angular/core';
import { ServicesLearningZoneService } from '../../services/services-learning-zone.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-request',
  templateUrl: './form-request.component.html',
  styleUrls: ['./form-request.component.scss']
})
export class FormRequestComponent implements OnInit{
  thematicAreas: any[] = [];
  selectThematicAreas: any;
  step1: boolean = true;
  step2: boolean = false;
  targetUser: any[] = [];
  projectPhase: any[] = [];
  optionsImportance: any[] = [
    {
      name:'Very important'
    },
    {
      name:'Important'
    },
    {
      name:'Useful'
    },
    {
      name:'Optional'
    },
    {
      name:'N/A'
    },
    {
      name:''
    },
    
  ];
  dialogConfirmation: boolean = false;
  loadingSave : boolean = false;
  selectCategory: any;
  selectRecharseDesing : any;
  selectRecharseImplementation : any;
  selectRecharseMonitoring : any;
  selecttsdesing : any;
  selecttsimplementation : any;
  selecttsmonitoring : any;
  selectacaidesing : any;
  selectacaiimplementation : any;
  selectacaimonitoring : any;

  categories: any[] = [
    {
      name: 'Articles and books',
    },
    {
      name: 'Training materials',
    },
    {
      name: 'Reports and other publications',
    },
    {
      name: 'Data, models and tools',
    },
    {
      name: 'Governanace administation and management',
    },
    {
      name: 'Outreach products',
    },
  ];
  constructor(private _servicesLearningZoneService:ServicesLearningZoneService, private router:Router){}
   requestToolNew = {
    name : '',
    email : '',
    source : '',
    description : '',
    target_scale : '',
    integrates_gender : '',
    participants : '',
    methods  : '',
    input_types : '',
    expected_outputs : '',
    human_resources : '',
    estimated_time : '',
    strengths : '',
    limitations : '',
    is_tested_online :  '',
    key_references : '',
    category_id : '',
    A : [],
    R : [],
    TS : [],
    resource : [
      {
      name : '',
      source : '',
      type : 
      { name : ''}
      
    }],
   }
   ngOnInit() {
    this.getAllFilters();
    
}
   getAllFilters(){
    this._servicesLearningZoneService.getSPFilters().subscribe((data)=>{
      console.log(data);

      this.thematicAreas = data.result.categories;
      this.targetUser = data.result.roles;
      this.projectPhase = data.result.stage;
    });
  }
  

  returnHome(){
    this.dialogConfirmation = false;
    this.router.navigate(['/aiccra/learning-zone']);
  }

  aditionalResource(){
    this.requestToolNew.resource.push({
      name : '',
      source : '',
      type : 
      { name : ''}
    });
  }

  postRequestTool(){
    this.loadingSave = true;
    this.selectRecharseDesing.stage_id = 9;
    this.selectRecharseImplementation.stage_id = 10;
    this.selectRecharseMonitoring.stage_id = 11;
    this.selectacaidesing.stage_id = 9;
    this.selectacaiimplementation.stage_id = 10;
    this.selectacaimonitoring.stage_id = 11;
    this.selecttsdesing.stage_id = 9;
    this.selecttsimplementation.stage_id = 10;
    this.selecttsmonitoring.stage_id = 11;
    this.requestToolNew.R.push(this.selectRecharseDesing, this.selectRecharseImplementation, this.selectRecharseMonitoring);
    this.requestToolNew.A.push(this.selectacaidesing, this.selectacaiimplementation, this.selectacaimonitoring);
    this.requestToolNew.TS.push(this.selecttsdesing, this.selecttsimplementation, this.selecttsmonitoring);
    this.requestToolNew.resource.map((data:any)=>{
      data.type = data.type.name;
    })
    this.requestToolNew.category_id = this.selectCategory.id;
    console.log(this.requestToolNew);

    this._servicesLearningZoneService.createRequestNewTool(this.requestToolNew).subscribe((data)=>{
      console.log(data);
      
      this.requestToolNew =
      {
        name : '',
        email : '',
        source : '',
        description : '',
        target_scale : '',
        integrates_gender : '',
        participants : '',
        methods  : '',
        input_types : '',
        expected_outputs : '',
        human_resources : '',
        estimated_time : '',
        strengths : '',
        limitations : '',
        is_tested_online :  '',
        key_references : '',
        category_id : '',
        A : [],
        R : [],
        TS : [],
        resource : [
          {
          name : '',
          source : '',
          type : 
          { name : ''}
          
        }],
       }
       this.selectRecharseDesing = null;
    this.selectRecharseImplementation = null;
    this.selectRecharseMonitoring = null;
    this.selectacaidesing = null;
    this.selectacaiimplementation = null;
    this.selectacaimonitoring = null;
    this.selecttsdesing = null;
    this.selecttsimplementation = null;
    this.selecttsmonitoring = null;
    this.selectCategory = null;
    this.step1 = true;
    this.step2 = false;
    this.loadingSave = false;
    });
  }
}
