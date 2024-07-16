import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaqRoutingModule } from './faq-routing.module';
import { FaqComponent } from './faq.component';
import { AccordionModule } from 'primeng/accordion';

@NgModule({
    imports: [CommonModule, FaqRoutingModule, AccordionModule, FaqComponent],
})
export class FaqModule {}
