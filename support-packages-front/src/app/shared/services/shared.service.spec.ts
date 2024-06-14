import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SharedService } from './shared.service';
import { environment } from '../../../environments/environment';

describe('SharedService', () => {
  let service: SharedService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SharedService],
    });
    service = TestBed.inject(SharedService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getSPFilters API', () => {
    const app_id = 123;
    const expectedUrl = `${environment.api}/support/all/${app_id}`;

    service.getSPFilters(app_id).subscribe();

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should call getAllTools API', () => {
    const app_id = 123;
    const expectedUrl = `${environment.api}/guidelines/sp-guidelines/all/${app_id}`;

    service.getAllTools(app_id).subscribe();

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should call getToolOverview API', () => {
    const app_id = 123;
    const expectedUrl = `${environment.api}/guidelines/sp-guidelines/overview/${app_id}`;

    service.getToolOverview(app_id).subscribe();

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should call downloadFiles API', () => {
    const keys = ['key1', 'key2'];
    const expectedUrl = `${environment.api}/file-management/download-zip`;
    const expectedResponse = new Blob();

    service.downloadFiles(keys).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ keys });
    req.flush(expectedResponse);
  });
});
