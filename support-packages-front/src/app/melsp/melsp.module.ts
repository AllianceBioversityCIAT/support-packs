import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MelspRoutingModule } from './melsp-routing.module';
import { MelspComponent } from './melsp.component';
import { MenubarModule } from 'primeng/menubar';
import { HomeMelComponent } from './pages/home-mel/home-mel.component';


@NgModule({
  declarations: [
    MelspComponent,
    
  ],
  imports: [
    CommonModule,
    MelspRoutingModule,
    MenubarModule
  ]
})
export class MelspModule { }
