import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';
import { PdfGenerateComponent } from './pdf-generate.component';
import { SharedService } from '../services/shared.service';

describe('PdfGenerateComponent', () => {
  let component: PdfGenerateComponent;
  let sharedService: SharedService;
  let messageService: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PdfGenerateComponent,
        {
          provide: SharedService,
          useValue: {
            downloadFiles: jest.fn(),
          },
        },
        {
          provide: MessageService,
          useValue: {
            add: jest.fn(),
          },
        },
      ],
    });

    component = TestBed.inject(PdfGenerateComponent);
    sharedService = TestBed.inject(SharedService);
    messageService = TestBed.inject(MessageService);

    global.IBDGoogleAnalytics = jest.fn().mockReturnValue({
      trackEvent: jest.fn(),
    });

    window.URL.createObjectURL = jest.fn();
    window.URL.revokeObjectURL = jest.fn();
    document.createElement = jest.fn().mockReturnValue({
      click: jest.fn(),
      setAttribute: jest.fn(),
      remove: jest.fn(),
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getAppNameByAppId', () => {
    it('should return the correct app name based on the app id', () => {
      component.app = 1;

      expect(component.getAppNameByAppId()).toBe('DMSP');
    });

    it('should return the correct app name based on the app id', () => {
      component.app = 2;

      expect(component.getAppNameByAppId()).toBe('MELSP');
    });

    it('should return the correct app name based on the app id', () => {
      component.app = 3;

      expect(component.getAppNameByAppId()).toBe('Learning zone');
    });

    it('should return the correct app name based on the app id', () => {
      component.app = 0;

      expect(component.getAppNameByAppId()).toBe('');
    });
  });

  describe('pdfDonwload', () => {
    it('should set isGenerating to true and call IBDGoogleAnalytics', () => {
      component.data = [
        {
          id: 2,
          source: 'https://support-packs-dev.s3.amazonaws.com/test1',
        },
      ];
      const mockTrackEvent = jest.fn();
      global.IBDGoogleAnalytics = jest.fn().mockReturnValue({ trackEvent: mockTrackEvent });

      (sharedService.downloadFiles as jest.Mock).mockReturnValue(of(new Blob()));

      component.generatePdf();

      expect(component.isGenerating).toBe(true);
    });

    it('should handle single file download', () => {
      component.data = [
        {
          id: 2,
          source: 'https://support-packs-dev.s3.amazonaws.com/test1',
        },
      ];
      const mockBlob = new Blob(['file content'], { type: 'application/pdf' });
      (sharedService.downloadFiles as jest.Mock).mockReturnValue(of(mockBlob));
      const mockCreateElement = document.createElement('a');

      component.generatePdf();

      expect(window.URL.createObjectURL).toHaveBeenCalledWith(mockBlob);
      expect(mockCreateElement.href).toBe(window.URL.createObjectURL(mockBlob));
      expect(mockCreateElement.download).toBe('test1');
      expect(component.isGenerating).toBe(true);
    });

    it('should handle multiple files download', () => {
      component.data = [
        {
          id: 1,
          source:
            'https://support-packs-dev.s3.amazonaws.com/data-dmsp/0_Protocols/Video_Transcript_-_Details_of_what_a_Research_Protocol_Should_Contain.pdf',
        },
        {
          id: 2,
          source: 'https://support-packs-dev.s3.amazonaws.com/test1',
        },
      ];
      const mockBlob = new Blob(['file content'], { type: 'application/zip' });
      (sharedService.downloadFiles as jest.Mock).mockReturnValue(of(mockBlob));
      const mockCreateElement = document.createElement('a');

      jest.spyOn(global.Date.prototype, 'toLocaleString').mockReturnValue('06/12/2023, 14:30:00');

      component.generatePdf();

      expect(window.URL.createObjectURL).toHaveBeenCalledWith(mockBlob);
      expect(mockCreateElement.href).toBe(window.URL.createObjectURL(mockBlob));
      expect(mockCreateElement.download).toContain('guidelinesDocuments_20230612_1430CET');
      expect(component.isGenerating).toBe(true);
    });

    it('should handle 404 error', () => {
      component.data = [
        {
          id: 2,
          source: 'https://support-packs-dev.s3.amazonaws.com/test1',
        },
      ];
      (sharedService.downloadFiles as jest.Mock).mockReturnValue(
        throwError(() => new Error('Not found', { cause: { error: 'Not Found', status: 404 } })),
      );

      component.generatePdf();

      expect(component.isGenerating).toBe(false);
    });

    it('should handle 500 error', () => {
      component.data = [
        {
          id: 2,
          source: 'https://support-packs-dev.s3.amazonaws.com/test1',
        },
      ];
      (sharedService.downloadFiles as jest.Mock).mockReturnValue(
        throwError(
          () =>
            new Error('Server error', {
              cause: {
                error: 'Internal Server Error',
                status: 500,
              },
            }),
        ),
      );

      component.generatePdf();

      expect(component.isGenerating).toBe(false);
    });

    it('should handle other errors', () => {
      component.data = [
        {
          id: 2,
          source: 'https://support-packs-dev.s3.amazonaws.com/test1',
        },
      ];
      (sharedService.downloadFiles as jest.Mock).mockReturnValue(
        throwError(
          () => new Error('Other error', { cause: { error: 'Other error', status: 403 } }),
        ),
      );

      component.generatePdf();

      expect(component.isGenerating).toBe(false);
      expect(messageService.add).not.toHaveBeenCalled();
    });
  });
});
