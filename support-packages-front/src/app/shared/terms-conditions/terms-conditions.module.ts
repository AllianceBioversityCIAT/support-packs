import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsConditionsComponent } from './terms-conditions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
  declarations: [TermsConditionsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    MultiSelectModule,
    InputTextareaModule,
    ReactiveFormsModule,
  ],
  exports: [TermsConditionsComponent],
})
export class TermsConditionsModule {}
