import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ServicesLearningZoneService } from '../../services/services-learning-zone.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  activeToolsData = [];
  items = [];

  activeItem: any;
  informationEdit: any = null;
  optionsImportance = [
    {
      id: 4,
      name: 'Very important',
    },
    {
      id: 3,
      name: 'Important',
    },
    {
      id: 2,
      name: 'Useful',
    },
    {
      id: 1,
      name: 'Optional',
    },
    {
      id: 0,
      name: 'N/A',
    },
  ];
  thematicAreas = [];
  visible: boolean = false;
  step1: boolean = true;
  step2: boolean = false;

  categories = [
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

  loadingSave: boolean = false;

  confirmDesactive: boolean = false;
  loading: boolean = false;

  loginForm = {
    email: '',
    password: '',
  };
  dialogLogin: boolean = true;
  error = {
    status: false,
    message: '',
  };

  constructor(
    private _servicesLearningZoneService: ServicesLearningZoneService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.items = [
      { label: 'Active Tools', icon: 'pi pi-fw pi-file-edit', id: 0 },
      { label: 'Archived Tools', icon: 'pi pi-fw pi-file', id: 1 },
      { label: 'Request', icon: 'pi pi-fw pi-share-alt', id: 2 },
    ];
    this.activeItem = this.items[0];
    this.getAllTools();

    if (this.getlocalStorageToken() !== null) {
      this.dialogLogin = false;
    }
  }

  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
    this.getAllTools();
  }

  getAllTools() {
    this.loading = true;
    this._servicesLearningZoneService.getToolsAdmin().subscribe((data) => {
      this.activeToolsData = data.result;
      this.loading = false;
    });

    this._servicesLearningZoneService.getSPFilters().subscribe((data) => {
      this.thematicAreas = data.result.categories;
    });
  }

  button1Validations() {
    this.step1 = true;
    this.step2 = false;
  }

  button2Validations() {
    this.step1 = false;
    this.step2 = true;
  }

  showEditDialog(tool) {
    this.visible = true;
    this.informationEdit = tool;
  }

  onCloseEditModal() {
    this.visible = false;
    this.step1 = true;
    this.step2 = false;
  }

  postTool() {
    this.loadingSave = true;
    // this.informationEdit.category_name = this.selectCategory[0].name;
    console.log(this.informationEdit);
    this._servicesLearningZoneService.putTool(this.informationEdit).subscribe((data) => {
      console.log(data);
      this.loadingSave = false;
      this.visible = false;
    });
  }

  desactive() {
    this.loadingSave = true;
    this._servicesLearningZoneService
      .activeOrDesactive(this.informationEdit, 0)
      .subscribe((data) => {
        console.log(data);
        this.getAllTools();
        this.confirmDesactive = false;
        this.loadingSave = false;
      });
  }

  showDialogDesactive(customer: any) {
    this.confirmDesactive = true;
    this.informationEdit = customer;
  }

  handleLogin() {
    try {
      this._servicesLearningZoneService.login(this.loginForm).subscribe((data) => {
        if (data.result === 'user not found' || data.result === 'Invalid password') {
          this.error = {
            status: true,
            message: 'User not found or invalid password',
          };
          return;
        }

        this.localStorageToken(data.result.token);
        this.dialogLogin = false;
      });
    } catch (error) {
      console.log(error);
      this.error = {
        status: true,
        message: 'Server error, try again later',
      };
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
