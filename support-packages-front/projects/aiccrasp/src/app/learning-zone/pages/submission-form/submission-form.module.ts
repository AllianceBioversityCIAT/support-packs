import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubmissionFormRoutingModule } from './submission-form-routing.module';
import { SubmissionFormComponent } from './submission-form.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
  declarations: [
    SubmissionFormComponent
  ],
  imports: [
    CommonModule,
    SubmissionFormRoutingModule,
    ButtonModule,
    InputTextModule,
    RadioButtonModule,
    FormsModule,
    DropdownModule,
    InputTextareaModule,
    ReactiveFormsModule      
  ]
})
export class SubmissionFormModule { }
