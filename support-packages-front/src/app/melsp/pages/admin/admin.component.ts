import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { LoginFormComponent } from '../../../shared/login-form/login-form.component';
import { SharedService } from '../../../shared/services/shared.service';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';
import { ResultsTableComponent } from '../../../learning-zone/pages/admin/component/results-table/results-table.component';
import { AdminToolsTableComponent } from '../../../shared/admin-tools-table/admin-tools-table.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    ButtonModule,
    InputTextModule,
    LoginFormComponent,
    TabMenuModule,
    ResultsTableComponent,
    AdminToolsTableComponent,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit {
  activeItem: MenuItem;
  items: MenuItem[];

  activeToolsData = [];
  disabledToolsData = [];
  requestedToolsData = [];

  loading: boolean = false;

  _sharedService = inject(SharedService);

  ngOnInit() {
    this.items = [
      { label: 'Active Tools', icon: 'pi pi-fw pi-file-edit', id: '0' },
      { label: 'Archived Tools', icon: 'pi pi-fw pi-file', id: '1' },
      { label: 'Request', icon: 'pi pi-fw pi-share-alt', id: '2' },
    ];
    this.activeItem = this.items[0];
    this.getActiveTools();

    if (this.getlocalStorageToken() !== null) {
      this._sharedService.isLoggedMELSP.set({
        status: true,
      });
    }
  }

  getlocalStorageToken() {
    return localStorage.getItem('tokenMELSP');
  }

  handleLogout() {
    localStorage.removeItem('tokenMELSP');
    this._sharedService.isLoggedMELSP.set({
      status: false,
    });
  }

  getActiveTools() {
    this.loading = true;

    this._sharedService.getActiveAdminTools(2).subscribe((data) => {
      this.activeToolsData = data.result;
      this.loading = false;
    });
  }

  getDisabledTools() {
    this.loading = true;

    this._sharedService.getDisabledAdminTools(2).subscribe((data) => {
      this.disabledToolsData = data.result;
      this.loading = false;
    });
  }

  getRequestedTools() {
    this.loading = true;

    this._sharedService.getRequestedAdminTools(2).subscribe((data) => {
      this.requestedToolsData = data.result;
      this.loading = false;
    });
  }

  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;

    switch (this.activeItem.id) {
      case '0':
        this.getActiveTools();
        break;
      case '1':
        this.getDisabledTools();
        break;
      case '2':
        this.getRequestedTools();
        break;
      default:
        break;
    }
  }
}
