import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolsResultsRoutingModule } from './tools-results-routing.module';
import { ToolsResultsComponent } from './tools-results.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import { PdfGenerateModule } from 'src/app/shared/pdf-generate/pdf-generate.module';
@NgModule({
    imports: [
    CommonModule,
    ToolsResultsRoutingModule,
    DropdownModule,
    FormsModule,
    TableModule,
    ButtonModule,
    PdfGenerateModule,
    ToolsResultsComponent,
],
})
export class ToolsResultsModule {}
