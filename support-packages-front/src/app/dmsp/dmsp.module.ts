import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DmspRoutingModule } from './dmsp-routing.module';
import { DmspComponent } from './dmsp.component';
import { MenubarModule } from 'primeng/menubar';

@NgModule({
  declarations: [
    DmspComponent
  ],
  imports: [
    CommonModule,
    DmspRoutingModule,
    MenubarModule
  ]
})
export class DmspModule { }
