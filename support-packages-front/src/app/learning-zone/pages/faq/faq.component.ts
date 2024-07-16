import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';

@Component({
    selector: 'app-faq',
    templateUrl: './faq.component.html',
    styleUrls: ['./faq.component.scss'],
    standalone: true,
    imports: [AccordionModule],
})
export class FaqComponent {}
