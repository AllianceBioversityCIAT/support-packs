import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MelspRoutingModule } from './melsp-routing.module';
import { MelspComponent } from './melsp.component';
import { MenubarModule } from 'primeng/menubar';

@NgModule({
    imports: [CommonModule, MelspRoutingModule, MenubarModule, MelspComponent],
})
export class MelspModule {}
