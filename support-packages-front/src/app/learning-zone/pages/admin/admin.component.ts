import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ServicesLearningZoneService } from '../../services/services-learning-zone.service';
import { Router } from '@angular/router';

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

  loadingSave: boolean = false;

  confirmDesactive: boolean = false;
  loading : boolean = false;
  dialogLogin: boolean = true;

  loginForm:any = {
    email: '',
    password: ''
  }
  error: boolean = false;
  constructor(private _servicesLearningZoneService:ServicesLearningZoneService, private router: Router) { }
  ngOnInit() {
    this.items = [
      
      {label: 'Active Tools', icon: 'pi pi-fw pi-file-edit', id:0},
      {label: 'Archived Tools', icon: 'pi pi-fw pi-file', id:1 },
      {label: 'Request', icon: 'pi pi-fw pi-share-alt', id:2 },
      
  ];
  this.activeItem = this.items[0];
  console.log(this.activeItem);
  this.getAllTools();
  if (this.getlocalStorageToken() != null) {
    this.dialogLogin = false;
  }
}

onActiveItemChange(event: MenuItem) {
  this.activeItem = event;
  this.getAllTools();
}

  getAllTools(){
    this.loading = true
    this.customers = [];
    this._servicesLearningZoneService.getToolsAdmin().subscribe((data)=>{
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
      this._servicesLearningZoneService.putTool(this.informationEdit).subscribe((data)=>{
        console.log(data);
        this.loadingSave = false;
        this.visible = false;
      });
  }


  desactive(){
    this.loadingSave = true;
    this._servicesLearningZoneService.activeOrDesactive(this.informationEdit, 0).subscribe((data)=>{
      console.log(data);
      this.getAllTools();
      this.confirmDesactive = false;
      this.loadingSave = false;
    });
  }

  showDialogDesactive(customer:any){
    this.confirmDesactive = true;
    this.informationEdit = customer;
  }

  redirecto(){
    this.router.navigate(['aiccra/learning-zone']);
    
    localStorage.clear();
  }

  login(){

    try {
      
      this._servicesLearningZoneService.login(this.loginForm).subscribe((data)=>{
        if (data.result == 'user not found' || data.result == 'Invalid password') {
          this.error = true;
        }else{
          this.localStorageToken(data.result.token);
          this.dialogLogin = false;
          console.log(data);
          this.error = false;
        }
        
      });
      
    } catch (error) {
        console.log('daw');
        
    }
    
  }

  localStorageToken(token: string) {
    localStorage.setItem('token', token);
  }

  getlocalStorageToken() {
    return localStorage.getItem('token');
  }

  setlocalStorageToken() {
    localStorage.removeItem('token');
    this.dialogLogin = true;
    this.loginForm.email = '';
    this.loginForm.password = '';
  }
}
