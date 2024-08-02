/* eslint-disable @angular-eslint/no-output-on-prefix */
import { CommonModule, NgStyle } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { SharedService } from '../../../services/shared.service';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'app-edit-modal-learning-zone',
  standalone: true,
  imports: [
    CommonModule,
    // SharedModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    InputTextareaModule,
    RadioButtonModule,
    DropdownModule,
    NgStyle,
  ],
  templateUrl: './edit-modal-learning-zone.component.html',
  styleUrl: './edit-modal-learning-zone.component.scss',
})
export class EditModalLearningZoneComponent {
  @Input() informationEdit: any;
  @Input() step1: boolean = true;
  @Input() step2: boolean = false;

  @Output() onEditTool: EventEmitter<any> = new EventEmitter();
  @Output() onButton1Validations: EventEmitter<any> = new EventEmitter();
  @Output() onButton2Validations: EventEmitter<any> = new EventEmitter();

  private _sharedService = inject(SharedService);

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
  ];

  editTool(): void {
    this.onEditTool.emit();
  }

  button1Validations(): void {
    this.onButton1Validations.emit();
  }

  button2Validations(): void {
    this.onButton2Validations.emit();
  }
}
