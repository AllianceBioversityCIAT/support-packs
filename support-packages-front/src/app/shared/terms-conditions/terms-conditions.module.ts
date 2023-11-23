import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsConditionsComponent } from './terms-conditions.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';



@NgModule({
  declarations: [
    TermsConditionsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
  ], exports: [
    TermsConditionsComponent
  ]
})
export class TermsConditionsModule { }
