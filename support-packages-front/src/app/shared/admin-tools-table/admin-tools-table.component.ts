/* eslint-disable @angular-eslint/no-output-on-prefix */
import { CommonModule, NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { ServicesLearningZoneService } from '../../learning-zone/services/services-learning-zone.service';
import { TableModule } from 'primeng/table';
import { SharedModule } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-admin-tools-table',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    SharedModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    InputTextareaModule,
    RadioButtonModule,
    DropdownModule,
    NgStyle,
  ],
  templateUrl: './admin-tools-table.component.html',
  styleUrls: ['./admin-tools-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  thematicAreas = [];
  categoryMELSP = [];

  EditModalOpen: boolean = false;
  step1: boolean = true;
  step2: boolean = false;

  isSaving: boolean = false;

  enableDisabledModalOpen: boolean = false;
  acceptedModalOpen: boolean = false;
  denyModalOpen: boolean = false;

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

  _sharedService = inject(SharedService);

  constructor(public _servicesLearningZoneService: ServicesLearningZoneService) {}

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

    if (this.activeItem?.id === 0) {
      this._servicesLearningZoneService.putTool(this.informationEdit).subscribe((data) => {
        this.getActiveTools();
        this.isSaving = false;
        this.EditModalOpen = false;
      });
    }

    if (this.activeItem?.id === 2) {
      this._servicesLearningZoneService.putToolRequest(this.informationEdit).subscribe((data) => {
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
    this._servicesLearningZoneService.aceptedRequest(this.informationEdit).subscribe((data) => {
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
    this._servicesLearningZoneService.denyToolRequest(this.informationEdit).subscribe((data) => {
      this.getRequestedTools();
      this.denyModalOpen = false;
      this.isSaving = false;
    });
  }
}
