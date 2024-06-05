import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ServicesTermsService } from './services-terms.service';

describe('ServicesTermsService', () => {
  let service: ServicesTermsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ServicesTermsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set termsConditions to true when calling termsAndConditions', () => {
    service.termsAndConditions();
    expect(service.termsConditions).toBe(true);
  });

  it('should reset termsConditions and continue to false when calling resetValues', () => {
    service.resetValues();
    expect(service.termsConditions).toBe(false);
    expect(service.continue).toBe(false);
  });

  it('should send a POST request to the API endpoint when calling postregisterdowload', () => {
    const testData = {
      /* provide test data here */
    };
    service.postregisterdowload(testData).subscribe();

    const req = httpMock.expectOne(`${service.urlApi}/support/registerDowloadTool`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(testData);

    req.flush({
      /* provide mock response here */
    });
  });
});
