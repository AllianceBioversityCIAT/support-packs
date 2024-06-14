import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ServicesLearningZoneService } from './services-learning-zone.service';
import { environment } from '../../../environments/environment';

describe('ServicesLearningZoneService', () => {
  let service: ServicesLearningZoneService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ServicesLearningZoneService],
    });
    service = TestBed.inject(ServicesLearningZoneService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a POST request to update a tool request', () => {
    const initialData = {
      id: 1,
      name: 'Test Tool',
    };
    const requestData = {
      id: 1,
      name: 'Test Tool Updated',
    };
    const expectedResponse = {
      status: 'Ok!',
      message: 'Successfully updated tool request!',
      result: requestData,
    };

    service.putToolRequest(requestData).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpMock.expectOne(
      `${environment.api}/support/updateToolRequest/3/${requestData.id}`,
    );
    expect(req.request.method).toBe('POST');
    expect(initialData.name).not.toEqual(expectedResponse.result.name);
    req.flush(expectedResponse);
  });

  it('should make a POST request to update a tool', () => {
    const initialData = {
      id: 1,
      name: 'Test Tool',
    };
    const requestData = {
      id: 1,
      name: 'Test Tool Updated',
    };
    const expectedResponse = {
      status: 'Ok!',
      message: 'Successfully updated tool!',
      result: requestData,
    };

    service.putTool(requestData).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpMock.expectOne(
      `${environment.api}/guidelines/sp-guidelines/updateTool/3/${requestData.id}`,
    );
    expect(req.request.method).toBe('POST');
    expect(initialData.name).not.toEqual(expectedResponse.result.name);
    req.flush(expectedResponse);
  });

  it('should make a GET request to fetch tools for admin that are inactive', () => {
    const expectedResponse = [
      {
        id: 1,
        name: 'Test Tool',
        active: false,
      },
      {
        id: 2,
        name: 'Test Tool 2',
        active: false,
      },
    ];

    service.getToolsAdminDesactive().subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpMock.expectOne(
      `${environment.api}/guidelines/sp-guidelines/editPanelDesactive/3`,
    );
    expect(req.request.method).toBe('GET');
    req.flush(expectedResponse);
  });

  it('should make a POST request to register a download', () => {
    const requestData = {
      // Add the necessary properties for the request data
    };
    const expectedResponse = {
      status: 'Ok!',
      message: 'Successfully registered download!',
      result: requestData,
    };

    service.postregisterdowload(requestData).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpMock.expectOne(`${environment.api}/support/registerDowloadTool`);
    expect(req.request.method).toBe('POST');
    req.flush(expectedResponse);
  });

  it('should make a GET request to fetch tool requests for admin', () => {
    const expectedResponse = {
      // Add the necessary properties for the expected response
    };

    service.getToolsAdminRquest().subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpMock.expectOne(`${environment.api}/support/editRequest/3`);
    expect(req.request.method).toBe('GET');
    req.flush(expectedResponse);
  });

  it('should make a GET request to fetch tools for admin', () => {
    const expectedResponse = {
      // Add the necessary properties for the expected response
    };

    service.getToolsAdmin().subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpMock.expectOne(`${environment.api}/guidelines/sp-guidelines/editPanel/3`);
    expect(req.request.method).toBe('GET');
    req.flush(expectedResponse);
  });

  it('should make a POST request to activate or deactivate a tool', () => {
    const requestData = {
      id: 1,
      active: true,
    };
    const isActive = false;
    const expectedResponse = {
      status: 'Ok!',
      message: 'Successfully updated tool!',
      result: requestData,
    };

    service.activeOrDesactive(requestData, isActive).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpMock.expectOne(
      `${environment.api}/guidelines/sp-guidelines/activeOrDesactive/3/${requestData.id}/${isActive}`,
    );
    expect(req.request.method).toBe('POST');
    req.flush(expectedResponse);
  });

  it('should make a POST request to login', () => {
    const requestData = {
      username: 'testuser',
      password: 'testpassword',
    };
    const expectedResponse = {
      status: 'Ok!',
      message: 'Successfully logged in!',
      result: requestData,
    };

    service.login(requestData).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpMock.expectOne(`${environment.api}/auth/auth/login`);
    expect(req.request.method).toBe('POST');
    req.flush(expectedResponse);
  });

  it('should make a POST request to create a tool request', () => {
    const requestData = {
      id: 1,
      active: true,
    };
    const expectedResponse = {
      status: 'Ok!',
      message: 'Successfully fetch data!',
      result: requestData,
    };

    service.createRequestNewTool(requestData).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpMock.expectOne(`${environment.api}/support/createToolNewRequest/3`);
    expect(req.request.method).toBe('POST');
    req.flush(expectedResponse);
  });

  it('should make a POST request to accept a tool request', () => {
    const requestData = {
      id: 1,
      active: true,
    };
    const expectedResponse = {
      status: 'Ok!',
      message: 'Successfully fetch data!',
      result: requestData,
    };

    service.aceptedRequest(requestData).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpMock.expectOne(`${environment.api}/guidelines/sp-guidelines/createToolNew/3`);
    expect(req.request.method).toBe('POST');
  });

  it('should make a POST request to deny a tool request', () => {
    const requestData = {
      id: 1,
      active: true,
    };
    const expectedResponse = {
      status: 'Ok!',
      message: 'Successfully fetch data!',
      result: { ...requestData, active: false },
    };

    service.denyToolRequest(requestData).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpMock.expectOne(
      `${environment.api}/support/denyToolRequest/3/${requestData.id}`,
    );
    expect(req.request.method).toBe('POST');
    req.flush(expectedResponse);
  });
});
