import { Component } from '@angular/core';
import { ServicesLearningZoneService } from 'src/app/learning-zone/services/services-learning-zone.service';

@Component({
  selector: 'app-request-tool',
  templateUrl: './request-tool.component.html',
  styleUrls: ['./request-tool.component.scss']
})
export class RequestToolComponent {
  items: any[] | undefined;

  activeItem: any | undefined;
  customers!: any[];
  visible: boolean = false;
  informationEdit:any = null ;
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
   optionsImportance: any[] = [
    {
      id:4,
      name:'Very important'
    },
    {
      id:3,
      name:'Important'
    },
    {
      id:2,
      name:'Useful'
    },
    {
      id:1,
      name:'Optional'
    },
    {
      id:0,
      name:'N/A'
    },    
  ];
  thematicAreas: any[] = [];
  step1: boolean = true;
  step2: boolean = false;
  selectCategory: any = {};

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
  selectCategories: any = {};

  loadingSave: boolean = false;

  confirmDesactive: boolean = false;
  loading : boolean = false;
  dialogLogin: boolean = true;

  loginForm:any = {
    email: '',
    password: ''
  }
  error: boolean = false;
  showDailogAcepted : boolean = false;
  showDailogdeny : boolean = false;
  constructor(private _servicesLearningZoneService:ServicesLearningZoneService) { }
  ngOnInit() {
    
  this.getAllTools();
}


  getAllTools(){
    this.loading = true
    this.customers = [];
    this._servicesLearningZoneService.getToolsAdminRquest().subscribe((data)=>{
      this.customers = data.result;
      console.log(data);
      this.loading = false;
    })

    this._servicesLearningZoneService.getSPFilters().subscribe((data)=>{
      console.log(data);

      this.thematicAreas = data.result.categories;
    });
  }

  showDialog(customer:any) {
    this.visible = true;
    this.informationEdit = customer;

    this.selectCategory = this.thematicAreas.filter((data:any)=>{
      return data.id == customer.category_id;
    });
    for (let index = 0; index < customer.resources.length; index++) {
      customer.resources[index].type = {
        name: customer.resources[index].type
      }
    }
    
  }

  postTool(){
    this.loadingSave = true;
     this.informationEdit.category_id = this.selectCategory[0].id;
      this.informationEdit.category_name = this.selectCategory[0].name;
      console.log(this.informationEdit);
      this._servicesLearningZoneService.putToolRequest(this.informationEdit).subscribe((data)=>{
        this.getAllTools();
        this.loadingSave = false;
        this.visible = false;
        this.step1 = true;
        this.step2 = false;
      });
  }

  showDialogAcepted(customer:any){
    this.showDailogAcepted = true;
    this.informationEdit = customer;
  }


  aceptedRequest(){
    this.loadingSave = true;
    this._servicesLearningZoneService.aceptedRequest(this.informationEdit).subscribe((data)=>{
      console.log(data);
      this.getAllTools();
      this.showDailogAcepted = false;
      this.loadingSave = false;
    });
  }

  showDenyRequest(customer:any){
    this.showDailogdeny = true;
    this.informationEdit = customer;
  }

  denyRequest(){
    this.loadingSave = true;
    this._servicesLearningZoneService.denyToolRequest(this.informationEdit).subscribe((data)=>{
      console.log(data);
      this.getAllTools();
      this.showDailogdeny = false;
      this.loadingSave = false;
    });
  }
}
