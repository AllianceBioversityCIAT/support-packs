import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeMelRoutingModule } from './home-mel-routing.module';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import { PdfGenerateModule } from 'src/app/shared/pdf-generate/pdf-generate.module';
import { HomeMelComponent } from './home-mel.component';

@NgModule({
    imports: [
    CommonModule,
    HomeMelRoutingModule,
    DropdownModule,
    FormsModule,
    TableModule,
    ButtonModule,
    PdfGenerateModule,
    HomeMelComponent,
],
})
export class HomeMelModule {}
