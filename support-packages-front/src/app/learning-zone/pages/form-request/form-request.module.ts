import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRequestRoutingModule } from './form-request-routing.module';
import { FormRequestComponent } from './form-request.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [FormRequestComponent],
  imports: [
    CommonModule,
    FormRequestRoutingModule,
    ButtonModule,
    InputTextModule,
    RadioButtonModule,
    FormsModule,
    DropdownModule,
    InputTextareaModule,
    ReactiveFormsModule,
    DialogModule,
  ],
})
export class FormRequestModule {}
