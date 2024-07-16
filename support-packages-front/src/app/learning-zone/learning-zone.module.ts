import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearningZoneRoutingModule } from './learning-zone-routing.module';
import { LearningZoneComponent } from './learning-zone.component';

import { ButtonModule } from 'primeng/button';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { PdfGenerateModule } from '../shared/pdf-generate/pdf-generate.module';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { AutoCompleteModule } from 'primeng/autocomplete';

@NgModule({
    imports: [
        CommonModule,
        LearningZoneRoutingModule,
        ButtonModule,
        PdfGenerateModule,
        DialogModule,
        FormsModule,
        TableModule,
        InputTextModule,
        MenubarModule,
        AutoCompleteModule,
        LearningZoneComponent, SideMenuComponent,
    ],
})
export class LearningZoneModule {}
