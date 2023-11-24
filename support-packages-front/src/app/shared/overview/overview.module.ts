import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview.component';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    OverviewComponent
  ],
  imports: [
    CommonModule,
    TableModule
  ], exports: [
    OverviewComponent
  ]
})
export class OverviewModule { }
