import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ResultsTableComponent } from './component/results-table/results-table.component';
@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        TabMenuModule,
        TableModule,
        ButtonModule,
        DialogModule,
        FormsModule,
        DropdownModule,
        InputTextModule,
        ButtonModule,
        InputTextareaModule,
        RadioButtonModule,
        ConfirmDialogModule,
        AdminComponent, ResultsTableComponent,
    ],
})
export class AdminModule {}
