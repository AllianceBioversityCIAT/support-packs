import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfGenerateComponent } from './pdf-generate.component';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [
    PdfGenerateComponent
  ],
  imports: [
    CommonModule,
    ButtonModule
  ], exports: [
    PdfGenerateComponent
  ]
})
export class PdfGenerateModule { }
