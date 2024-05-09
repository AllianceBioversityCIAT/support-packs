import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ServicesLearningZoneService } from '../../services/services-learning-zone.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  activeToolsData = [];
  requestedToolsData = [];
  desactiveToolsData = [];
  items = [];
  activeItem: any;
  loading: boolean = false;
  dialogLogin: boolean = true;

  loginForm = {
    email: '',
    password: '',
  };

  error = {
    status: false,
    message: '',
  };

  constructor(private _servicesLearningZoneService: ServicesLearningZoneService) {}

  ngOnInit() {
    this.items = [
      { label: 'Active Tools', icon: 'pi pi-fw pi-file-edit', id: 0 },
      { label: 'Archived Tools', icon: 'pi pi-fw pi-file', id: 1 },
      { label: 'Request', icon: 'pi pi-fw pi-share-alt', id: 2 },
    ];
    this.activeItem = this.items[0];
    this.getActiveTools();

    if (this.getlocalStorageToken() !== null) {
      this.dialogLogin = false;
    }
  }

  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;

    switch (this.activeItem.id) {
      case 0:
        this.getActiveTools();
        break;
      case 1:
        this.getDesactiveTools();
        break;
      case 2:
        this.getRequestedTools();
        break;
      default:
        break;
    }
  }

  getActiveTools() {
    this.loading = true;
    this._servicesLearningZoneService.getToolsAdmin().subscribe((data) => {
      this.activeToolsData = data.result;
      this.loading = false;
    });
  }

  getRequestedTools() {
    this.loading = true;
    this._servicesLearningZoneService.getToolsAdminRquest().subscribe((data) => {
      this.requestedToolsData = data.result;
      this.loading = false;
    });
  }

  getDesactiveTools() {
    this.loading = true;
    this._servicesLearningZoneService.getToolsAdminDesactive().subscribe((data) => {
      this.desactiveToolsData = data.result;
      this.loading = false;
    });
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
