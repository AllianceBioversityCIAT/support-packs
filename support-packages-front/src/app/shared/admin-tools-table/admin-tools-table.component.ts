/* eslint-disable @angular-eslint/no-output-on-prefix */
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SharedService } from '../services/shared.service';
import { EditModalMelspComponent } from './components/edit-modal-melsp/edit-modal-melsp.component';
import { EditModalLearningZoneComponent } from './components/edit-modal-learning-zone/edit-modal-learning-zone.component';
import { InputTextModule } from 'primeng/inputtext';
import { EditModalDmspComponent } from './components/edit-modal-dmsp/edit-modal-dmsp.component';

@Component({
  selector: 'app-admin-tools-table',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    EditModalMelspComponent,
    EditModalLearningZoneComponent,
    EditModalDmspComponent,
  ],
  templateUrl: './admin-tools-table.component.html',
  styleUrls: ['./admin-tools-table.component.scss'],
})
export class AdminToolsTableComponent {
  @Input() tableData: any;
  @Input() activeItem: any;
  @Input() tableDataLoading: boolean;
  @Input() app_id: string;

  @Output() onGetActiveTools: EventEmitter<any> = new EventEmitter();
  @Output() onGetRequestedTools: EventEmitter<any> = new EventEmitter();
  @Output() onGetDesactiveTools: EventEmitter<any> = new EventEmitter();

  informationEdit = null;

  EditModalOpen: boolean = false;
  step1: boolean = true;
  step2: boolean = false;

  isSaving: boolean = false;

  enableDisabledModalOpen: boolean = false;
  acceptedModalOpen: boolean = false;
  denyModalOpen: boolean = false;

  _sharedService = inject(SharedService);

  getActiveTools(): void {
    this.onGetActiveTools.emit();
  }

  getRequestedTools(): void {
    this.onGetRequestedTools.emit();
  }

  getDesactiveTools(): void {
    this.onGetDesactiveTools.emit();
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
    this.EditModalOpen = true;
    this.informationEdit = tool;
  }

  onCloseEditModal() {
    this.EditModalOpen = false;
    this.step1 = true;
    this.step2 = false;
  }

  editTool() {
    this.isSaving = true;

    if (this.activeItem?.id === '0') {
      this._sharedService.putTool(this.app_id, this.informationEdit).subscribe((data) => {
        this.getActiveTools();
        this.isSaving = false;
        this.EditModalOpen = false;
      });
    }

    if (this.activeItem?.id === '2') {
      this._sharedService.putToolRequest(this.app_id, this.informationEdit).subscribe((data) => {
        this.getRequestedTools();
        this.isSaving = false;
        this.EditModalOpen = false;
      });
    }
  }

  showDialogDesactive(customer: any) {
    this.enableDisabledModalOpen = true;
    this.informationEdit = customer;
  }

  handleDesactive() {
    this.isSaving = true;

    this._sharedService
      .activeOrDesactive(this.app_id, this.informationEdit, this.activeItem?.id !== '0')
      .subscribe(() => {
        if (this.activeItem?.id === '0') this.getActiveTools();
        if (this.activeItem?.id === '1') this.getDesactiveTools();

        this.enableDisabledModalOpen = false;
        this.isSaving = false;
      });
  }

  showDialogAccepted(tool: any) {
    this.acceptedModalOpen = true;
    this.informationEdit = tool;
  }

  acceptRequest() {
    this.isSaving = true;
    this._sharedService.aceptedRequest(this.app_id, this.informationEdit).subscribe((data) => {
      this.getRequestedTools();
      this.acceptedModalOpen = false;
      this.isSaving = false;
    });
  }

  showDenyRequest(tool: any) {
    this.denyModalOpen = true;
    this.informationEdit = tool;
  }

  denyRequest() {
    this.isSaving = true;
    this._sharedService.denyToolRequest(this.app_id, this.informationEdit).subscribe((data) => {
      this.getRequestedTools();
      this.denyModalOpen = false;
      this.isSaving = false;
    });
  }
}
