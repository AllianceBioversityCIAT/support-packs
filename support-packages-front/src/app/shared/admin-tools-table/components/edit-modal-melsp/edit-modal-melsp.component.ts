import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SharedService } from '../../../services/shared.service';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-edit-modal-melsp',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    RadioButtonModule,
    FileUploadModule,
  ],
  templateUrl: './edit-modal-melsp.component.html',
  styleUrl: './edit-modal-melsp.component.scss',
})
export class EditModalMelspComponent implements OnInit {
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

  uploadedFile = null;
  _sharedService = inject(SharedService);

  ngOnInit(): void {
    this.informationEdit.isLink = false;
  }

  removeFile(uploadedFile) {
    if (!uploadedFile) {
      return;
    }

    this.uploadedFile = null;

    this._sharedService.removeFile(uploadedFile.key).subscribe({
      next: (res) => {
        this.informationEdit.source = '';
      },

      error: (err) => {
        console.error(err);
      },
    });
  }

  onBasicUploadAuto(event) {
    this.uploadedFile = event.files[0];

    this._sharedService.uploadFile(event.files[0]).subscribe({
      next: (res) => {
        this.informationEdit.source = res.fileUrl;
        this.uploadedFile = {
          name: res.fileName,
          url: res.fileUrl,
          key: res.key,
        };
      },

      error: (err) => {
        console.error(err);
      },
    });
  }

  editTool(): void {
    this.onEditTool.emit();
  }
}
