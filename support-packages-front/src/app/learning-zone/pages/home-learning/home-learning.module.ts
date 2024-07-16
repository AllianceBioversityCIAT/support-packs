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
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';

import { Bolt, Link2, LucideAngularModule } from 'lucide-angular';

@NgModule({
    imports: [
    CommonModule,
    HomeLearningRoutingModule,
    DropdownModule,
    FormsModule,
    TableModule,
    ButtonModule,
    AccordionModule,
    InputTextModule,
    PdfGenerateModule,
    InputTextareaModule,
    MultiSelectModule,
    LucideAngularModule.pick({ Bolt, Link2 }),
    HomeLearningComponent,
],
})
export class HomeLearningModule {}
