import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearningZoneRoutingModule } from './learning-zone-routing.module';
import { LearningZoneComponent } from './learning-zone.component';

import { ButtonModule } from 'primeng/button';
import { SideMenuComponent } from './components/side-menu/side-menu.component';

@NgModule({
  declarations: [
    LearningZoneComponent,
    SideMenuComponent
  ],
  imports: [
    CommonModule,
    LearningZoneRoutingModule,
    ButtonModule
  ]
})
export class LearningZoneModule { }
