import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FileUploadModule } from 'primeng/fileupload';
import { SharedService } from '../../../shared/services/shared.service';

interface IWhat {
  id: number;
  name: string;
  description: string;
  app_id: number;
}

@Component({
  selector: 'app-form-request',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    RadioButtonModule,
    FileUploadModule,
  ],
  templateUrl: './form-request.component.html',
  styleUrl: './form-request.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormRequestComponent implements OnInit {
  fb = inject(FormBuilder);
  _sharedService = inject(SharedService);

  optionsImportance = [];

  uploadedFile = null;
  whatData: IWhat[] = [];

  loadingSave = false;

  requestToolNewForm = this.fb.group({
    full_name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    name: ['', [Validators.required]],
    isLink: [false, [Validators.required]],
    source: ['', [Validators.required]],
    category_id: [null, [Validators.required]],
    'M&EO': this.fb.group({
      Designing: [null, [Validators.required]],
      Implementation: [null, [Validators.required]],
      'Closure&Beyond': [null, [Validators.required]],
    }),
    PJM: this.fb.group({
      Designing: [null, [Validators.required]],
      Implementation: [null, [Validators.required]],
      'Closure&Beyond': [null, [Validators.required]],
    }),
    PM: this.fb.group({
      Designing: [null, [Validators.required]],
      Implementation: [null, [Validators.required]],
      'Closure&Beyond': [null, [Validators.required]],
    }),
  });

  ngOnInit() {
    this.optionsImportance = [
      {
        name: 'Very important',
      },
      {
        name: 'Important',
      },
      {
        name: 'Useful',
      },
      {
        name: 'Optional',
      },
    ];
    this.getFilters();
  }

  getFilters() {
    this._sharedService.getSPFilters(2).subscribe((data) => {
      this.whatData = data.result.categories;
    });
  }

  onBasicUploadAuto(event) {
    this.uploadedFile = event.files[0];

    this._sharedService.uploadFile(event.files[0]).subscribe({
      next: (res) => {
        this.requestToolNewForm.get('source').setValue(res.fileUrl);
        this.uploadedFile = {
          key: res.key,
        };
      },

      error: (err) => {
        console.error(err);
      },
    });
  }

  removeFile(uploadedFile) {
    if (!uploadedFile) {
      return;
    }

    this.uploadedFile = null;

    this._sharedService.removeFile(uploadedFile.key).subscribe({
      next: (res) => {
        this.requestToolNewForm.get('source').setValue('');
      },

      error: (err) => {
        console.error(err);
      },
    });
  }

  handleRequestTool() {
    if (this.requestToolNewForm.invalid) {
      return;
    }

    this.loadingSave = true;

    this._sharedService.createRequestNewTool('2', this.requestToolNewForm.getRawValue()).subscribe({
      next: (data) => {
        console.error(data);
        this.requestToolNewForm.reset();
        this.loadingSave = false;
      },
      error: (error) => {
        console.error(error);
        this.loadingSave = false;
      },
    });
  }
}
