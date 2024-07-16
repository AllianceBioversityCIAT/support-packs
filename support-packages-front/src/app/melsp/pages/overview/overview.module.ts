import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverviewRoutingModule } from './overview-routing.module';
import { OverviewComponent } from './overview.component';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
    imports: [
        CommonModule,
        OverviewRoutingModule,
        FormsModule,
        TableModule,
        InputTextModule,
        OverviewComponent
    ]
})
export class OverviewModule { }
