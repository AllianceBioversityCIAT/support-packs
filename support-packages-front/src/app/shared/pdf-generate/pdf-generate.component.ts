import { Component, Input } from '@angular/core';
import { IBDGoogleAnalytics } from 'ibdevkit';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { SharedService } from '../services/shared.service';
import { MessageService } from 'primeng/api';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-pdf-generate',
  templateUrl: './pdf-generate.component.html',
  styleUrls: ['./pdf-generate.component.scss'],
})
export class PdfGenerateComponent {
  @Input() data: any;
  @Input() app: number;
  @Input() buttonText: string = 'Download PDF';
  @Input() inlineStyle: { [klass: string]: any } = {};
  @Input() buttonSize: 'small' | 'large' | undefined = undefined;
  isGenerating: boolean = false;

  constructor(
    private messageService: MessageService,
    public _sharedService: SharedService,
  ) {}

  getAppNameByAppId() {
    switch (this.app) {
      case 1:
        return 'DMSP';
      case 2:
        return 'MELSP';
      case 3:
        return 'Learning zone';
      default:
        return '';
    }
  }

  generatePdf() {
    this.isGenerating = true;
    const dataKeys = this.data.map((element: any) => {
      const key = element.source.split('/').slice(3).join('/');

      return key;
    });

    IBDGoogleAnalytics().trackEvent('PDF Download', this.getAppNameByAppId());

    this._sharedService.downloadFiles(dataKeys).subscribe({
      next: (blob) => {
        const a = document.createElement('a');
        const url = window.URL.createObjectURL(blob);

        if (dataKeys.length === 1) {
          const fileName = dataKeys[0].split('/').pop();
          a.href = url;
          a.download = fileName!;
        } else {
          const dateCETTime = new Date().toLocaleString('en-US', {
            timeZone: 'Europe/Madrid',
            hour12: false,
          });

          const date = dateCETTime.split(',')[0].split('/');
          let day = date[1];
          let month = date[0];
          const year = date[2];

          if (day.length === 1) {
            day = '0' + day;
          }

          if (month.length === 1) {
            month = '0' + month;
          }

          const dateCET = year + month + day;

          const timeCET = dateCETTime.split(',')[1].trim().replace(':', '').slice(0, 4);

          a.href = url;
          a.download = `guidelinesDocuments_${dateCET}_${timeCET}CET`;
        }

        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        this.messageService.add({
          severity: 'success',
          summary: dataKeys.length === 1 ? 'File Download' : 'Files Download',
          detail:
            dataKeys.length === 1
              ? 'File downloaded successfully'
              : 'Files downloaded successfully',
          key: 'br',
        });
        this.isGenerating = false;
      },
      error: (error) => {
        console.error(error);
        this.isGenerating = false;

        if (error.status === 404) {
          this.messageService.add({
            severity: 'error',
            summary: 'File Download',
            detail: 'File not found',
            key: 'br',
          });
        }

        if (error.status === 500) {
          this.messageService.add({
            severity: 'error',
            summary: 'File Download',
            detail: 'Internal Server Error',
            key: 'br',
          });
        }
      },
    });
  }
}
