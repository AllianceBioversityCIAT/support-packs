import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolsResultsRoutingModule } from './tools-results-routing.module';
import { ToolsResultsComponent } from './tools-results.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TermsConditionsModule } from '../../../shared/terms-conditions/terms-conditions.module';
import { PdfGenerateModule } from 'src/app/shared/pdf-generate/pdf-generate.module';
@NgModule({
  declarations: [ToolsResultsComponent],
  imports: [
    CommonModule,
    ToolsResultsRoutingModule,
    DropdownModule,
    FormsModule,
    TableModule,
    ButtonModule,
    TermsConditionsModule,
    PdfGenerateModule,
  ],
})
export class ToolsResultsModule {}
