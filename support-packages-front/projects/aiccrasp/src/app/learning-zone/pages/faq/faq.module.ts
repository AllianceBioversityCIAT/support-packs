import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FAQRoutingModule } from './faq-routing.module';
import { FAQComponent } from '../faq/faq.component';
import { AccordionModule } from 'primeng/accordion';


@NgModule({
  declarations: [
    FAQComponent
  ],
  imports: [
    CommonModule,
    FAQRoutingModule,
    AccordionModule
  ]
})
export class FAQModule { }
