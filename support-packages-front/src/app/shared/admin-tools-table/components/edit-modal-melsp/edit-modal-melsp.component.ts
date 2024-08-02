/* eslint-disable @angular-eslint/no-output-on-prefix */
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-edit-modal-melsp',
  standalone: true,
  imports: [CommonModule, FormsModule, DropdownModule, ButtonModule, InputTextModule],
  templateUrl: './edit-modal-melsp.component.html',
  styleUrl: './edit-modal-melsp.component.scss',
})
export class EditModalMelspComponent {
  @Input() informationEdit: any;
  @Output() onEditTool: EventEmitter<any> = new EventEmitter();

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
}
