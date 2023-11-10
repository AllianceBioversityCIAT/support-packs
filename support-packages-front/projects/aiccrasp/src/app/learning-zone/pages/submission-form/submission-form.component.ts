import { Component, OnInit } from '@angular/core';
import { ServicesLearningZoneService } from '../../services/services-learning-zone.service';

@Component({
  selector: 'app-submission-form',
  templateUrl: './submission-form.component.html',
  styleUrls: ['./submission-form.component.css']
})
export class SubmissionFormComponent implements OnInit{
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
  constructor(private _servicesLearningZoneService:ServicesLearningZoneService){}
  requestTool: any = {
    name: '',
    email: '',
    toolName:'',
    description: '',
    link: '',
    estimatedTime: '',
    gender: '',
    test:'',
    scale: '',
    participates: '',
    method: '',
    types: '',
    limitations: '',
    strngths: '',
    expected: '',
    required : '',
    keyPerson: '',
    thematic: '',
    researcher_desing: '',
    researcher_implementation: '',
    researcher_monitoring: '',
    technical_desing: '',
    technical_implementation: '',
    technical_monitoring: '',
    academia_desing: '',
    academia_implementation: '',
    academia_monitoring: '',
    resouce_title: '',
    resouce_link: '',
    resouce_category: '',
   };
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
  postRequest(){  
    
    console.log(this.requestTool);
    this._servicesLearningZoneService.postRequestTool(this.requestTool).subscribe((data)=>{
      console.log(data);
      this.requestTool = {
        name: '',
        email: '',
        toolName:'',
        description: '',
        link: '',
        estimatedTime: '',
        gender: '',
        test:'',
        scale: '',
        participates: '',
        method: '',
        types: '',
        limitations: '',
        strngths: '',
        expected: '',
        required : '',
        keyPerson: '',
        thematic: '',
        researcher_desing: '',
        researcher_implementation: '',
        researcher_monitoring: '',
        technical_desing: '',
        technical_implementation: '',
        technical_monitoring: '',
        academia_desing: '',
        academia_implementation: '',
        academia_monitoring: '',
        resouce_title: '',
        resouce_link: '',
        resouce_category: '',
       };

       this.step1 = true;
        this.step2 = false;
    })
  }
}
