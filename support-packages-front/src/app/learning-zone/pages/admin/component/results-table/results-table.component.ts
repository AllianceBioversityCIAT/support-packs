import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ServicesLearningZoneService } from 'src/app/learning-zone/services/services-learning-zone.service';

@Component({
  selector: 'app-results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.scss'],
})
export class ResultsTableComponent {
  @Input() tableData: any;
  @Input() activeItem: any;
  @Input() tableDataLoading: boolean;

  @Output() onGetActiveTools: EventEmitter<any> = new EventEmitter();
  @Output() onGetRequestedTools: EventEmitter<any> = new EventEmitter();
  @Output() onGetDesactiveTools: EventEmitter<any> = new EventEmitter();

  informationEdit = null;

  thematicAreas = [];
  EditModalOpen: boolean = false;
  step1: boolean = true;
  step2: boolean = false;

  isSaving: boolean = false;

  desactiveModalOpen: boolean = false;
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

  constructor(private _servicesLearningZoneService: ServicesLearningZoneService) {}

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

    if (this.activeItem.id === 0) {
      this._servicesLearningZoneService.putTool(this.informationEdit).subscribe((data) => {
        this.getActiveTools();
        this.isSaving = false;
        this.EditModalOpen = false;
      });
    }

    if (this.activeItem.id === 2) {
      this._servicesLearningZoneService.putToolRequest(this.informationEdit).subscribe((data) => {
        this.getRequestedTools();
        this.isSaving = false;
        this.EditModalOpen = false;
      });
    }
  }

  showDialogDesactive(customer: any) {
    this.desactiveModalOpen = true;
    this.informationEdit = customer;
  }

  handleDesactive() {
    this.isSaving = true;

    this._servicesLearningZoneService
      .activeOrDesactive(this.informationEdit, this.activeItem.id === 0 ? 0 : 1)
      .subscribe(() => {
        if (this.activeItem.id === 0) this.getActiveTools();
        if (this.activeItem.id === 1) this.getDesactiveTools();

        this.desactiveModalOpen = false;
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
