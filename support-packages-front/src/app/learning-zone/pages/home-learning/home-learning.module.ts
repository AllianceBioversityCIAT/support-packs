import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeLearningRoutingModule } from './home-learning-routing.module';
import { HomeLearningComponent } from './home-learning.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { InputTextModule } from 'primeng/inputtext';
import { PdfGenerateModule } from 'src/app/shared/pdf-generate/pdf-generate.module';

@NgModule({
  declarations: [
    HomeLearningComponent
  ],
  imports: [
    CommonModule,
    HomeLearningRoutingModule,
    DropdownModule,
    FormsModule,
    TableModule,
    ButtonModule,
    AccordionModule,
    InputTextModule,
    PdfGenerateModule
  ]
})
export class HomeLearningModule { }