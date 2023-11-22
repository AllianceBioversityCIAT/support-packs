import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearningZoneRoutingModule } from './learning-zone-routing.module';
import { LearningZoneComponent } from './learning-zone.component';

import { ButtonModule } from 'primeng/button';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { PdfGenerateModule } from '../shared/pdf-generate/pdf-generate.module';

@NgModule({
  declarations: [
    LearningZoneComponent,
    SideMenuComponent,
    
  ],
  imports: [
    CommonModule,
    LearningZoneRoutingModule,
    ButtonModule,
    PdfGenerateModule
  ]
})
export class LearningZoneModule { }
