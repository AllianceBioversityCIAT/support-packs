import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    DropdownModule,
    FormsModule,
    TableModule,
    ButtonModule,
    AccordionModule,
    InputTextModule
  ]
})
export class AdminModule { }
