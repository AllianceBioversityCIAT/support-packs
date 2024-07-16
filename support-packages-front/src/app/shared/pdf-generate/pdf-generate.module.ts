import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfGenerateComponent } from './pdf-generate.component';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@NgModule({
    imports: [CommonModule, ButtonModule, ToastModule, PdfGenerateComponent],
    exports: [PdfGenerateComponent],
    providers: [MessageService],
})
export class PdfGenerateModule {}
