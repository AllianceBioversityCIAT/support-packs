import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ServicesLearningZoneService } from '../../services/services-learning-zone.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit{
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
  constructor(private _servicesLearningZoneService:ServicesLearningZoneService) { }
  ngOnInit() {
    this.items = [
      
      {label: 'Edit Panel', icon: 'pi pi-fw pi-pencil', id:0},
      {label: 'Add New', icon: 'pi pi-fw pi-plus', id:1}
      
  ];
  this.activeItem = this.items[0];
  console.log(this.activeItem);
  this.getAllTools();
  
}

onActiveItemChange(event: MenuItem) {
  this.activeItem = event;
}

  getAllTools(){
    this._servicesLearningZoneService.getToolsAdmin().subscribe((data)=>{
      this.customers = data.result;
      console.log(data);
      
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
     this.informationEdit.category_id = this.selectCategory[0].id;
      this.informationEdit.category_name = this.selectCategory[0].name;
      console.log(this.informationEdit);
      
  }
}
