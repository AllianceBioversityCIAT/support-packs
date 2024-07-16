import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OverviewComponent } from './overview.component';
import { SharedService } from '../../../shared/services/shared.service';
import { of } from 'rxjs';
import { TableModule } from 'primeng/table';

describe('OverviewComponent', () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;
  let mockSharedService;

  beforeEach(() => {
    mockSharedService = {
      getToolOverview: jest.fn().mockReturnValue(
        of({
          result: [
            {
              category_id: 1,
              id: 1,
              name: 'Tool 1',
              cate_name: 'Category 1',
              resources: [
                {
                  acronym: 'T1',
                  name: 'Resource 1',
                  importance_level: 'Very important',
                  category_id: 1,
                  id: 1,
                  role_id: 1,
                },
              ],
              source: 'Source 1',
              type: '0',
            },
          ],
        }),
      ),
    };

    TestBed.configureTestingModule({
      imports: [TableModule],
      providers: [{ provide: SharedService, useValue: mockSharedService }],
    });

    fixture = TestBed.createComponent(OverviewComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getInformation on init', () => {
    const getInformationSpy = jest.spyOn(component, 'getInformation');
    component.ngOnInit();
    expect(getInformationSpy).toHaveBeenCalled();
  });

  it('should set loading to false and populate overviewTools after getInformation is called', () => {
    component.getInformation();
    expect(component.loading).toBe(false);
    expect(component.overviewTools.length).toBe(1);
    expect(component.overviewTools[0].name).toBe('Tool 1');
  });

  it('should return correct icon by type', () => {
    expect(component.getIconByType('0')).toBe('pi pi-file');
    expect(component.getIconByType('1')).toBe('pi pi-youtube');
    expect(component.getIconByType('2')).toBe('');
    expect(component.getIconByType('3')).toBe('');
  });

  it('should return correct download icon by type', () => {
    expect(component.getIconByTypeDownload('0')).toBe('pi pi-download');
    expect(component.getIconByTypeDownload('1')).toBe('pi pi-link');
    expect(component.getIconByTypeDownload('2')).toBe('pi pi-link');
    expect(component.getIconByTypeDownload('3')).toBe('');
  });

  it('should return correct importance level and style color', () => {
    const resource = {
      acronym: 'T1',
      name: 'Resource 1',
      importance_level: 'Very important',
      category_id: 1,
      id: 1,
      role_id: 1,
    };

    const importance = component.getImportants(resource as any);
    expect(importance.importanceLevel).toBe(4);
    expect(importance.styleColor).toBe('veryImportant');
  });

  it('should return default importance level and style color for Important importance level', () => {
    const resource = {
      acronym: 'T1',
      name: 'Resource 1',
      importance_level: 'Important',
      category_id: 1,
      id: 1,
      role_id: 1,
    };

    const importance = component.getImportants(resource as any);
    expect(importance.importanceLevel).toBe(3);
    expect(importance.styleColor).toBe('important');
  });

  it('should return default importance level and style color for Useful importance level', () => {
    const resource = {
      acronym: 'T1',
      name: 'Resource 1',
      importance_level: 'Useful',
      category_id: 1,
      id: 1,
      role_id: 1,
    };

    const importance = component.getImportants(resource as any);
    expect(importance.importanceLevel).toBe(2);
    expect(importance.styleColor).toBe('useful');
  });

  it('should return default importance level and style color for Optional importance level', () => {
    const resource = {
      acronym: 'T1',
      name: 'Resource 1',
      importance_level: 'Optional',
      category_id: 1,
      id: 1,
      role_id: 1,
    };

    const importance = component.getImportants(resource as any);
    expect(importance.importanceLevel).toBe(1);
    expect(importance.styleColor).toBe('optional');
  });

  it('should return default importance level and style color for unknown importance level', () => {
    const resource = {
      acronym: 'T1',
      name: 'Resource 1',
      importance_level: 'Unknown',
      category_id: 1,
      id: 1,
      role_id: 1,
    };

    const importance = component.getImportants(resource as any);
    expect(importance.importanceLevel).toBe(0);
    expect(importance.styleColor).toBe('');
  });
});
