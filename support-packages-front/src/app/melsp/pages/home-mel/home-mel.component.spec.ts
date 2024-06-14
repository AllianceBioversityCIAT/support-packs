import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeMelComponent } from './home-mel.component';
import { ServicesTermsService } from '../../../shared/services/services-terms.service';
import { SharedService } from '../../../shared/services/shared.service';
import { of } from 'rxjs';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

describe('HomeMelComponent', () => {
  let component: HomeMelComponent;
  let fixture: ComponentFixture<HomeMelComponent>;
  let mockServicesTermsService;
  let mockSharedService;

  beforeEach(() => {
    mockServicesTermsService = {
      termsConditions: false,
      continue: false,
      resetValues: jest.fn(),
    };

    mockSharedService = {
      getSPFilters: jest.fn().mockReturnValue(
        of({
          result: {
            categories: [{ id: 1, name: 'Category 1' }],
            roles: [{ id: 1, name: 'Role 1' }],
            stage: [{ id: 1, name: 'Stage 1' }],
          },
        }),
      ),
      getAllTools: jest.fn().mockReturnValue(
        of({
          result: [
            {
              id: 1,
              name: 'Tool 1',
              category_id: 1,
              role_id: 1,
              stage_id: 1,
              type: '0',
              importance_level: 'Very important',
            },
          ],
        }),
      ),
    };

    TestBed.configureTestingModule({
      declarations: [HomeMelComponent],
      imports: [DropdownModule, FormsModule],
      providers: [
        { provide: ServicesTermsService, useValue: mockServicesTermsService },
        { provide: SharedService, useValue: mockSharedService },
      ],
    });

    fixture = TestBed.createComponent(HomeMelComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getFilters and getTools on init', () => {
    const getFiltersSpy = jest.spyOn(component, 'getFilters');
    const getToolsSpy = jest.spyOn(component, 'getTools');

    component.ngOnInit();

    expect(getFiltersSpy).toHaveBeenCalled();
    expect(getToolsSpy).toHaveBeenCalled();
  });

  it('should return correct icon by type', () => {
    expect(component.getIconByType('0')).toBe('pi pi-file');
    expect(component.getIconByType('1')).toBe('pi pi-youtube');
    expect(component.getIconByType('2')).toBe('pi pi-paperclip');
    expect(component.getIconByType('3')).toBe('');
  });

  it('should validate showPdfButton correctly', () => {
    component.selectedProducts = [{ type: '0' }, { type: '1' }] as any;

    const result = component.validateShowPdfButton();

    expect(result.showPdfButton).toBe(true);
    expect(result.ToolsType0.length).toBe(1);
    expect(result.buttonMessage).toBe('Download File');
  });

  it('should validate showPdfButton correctly when selected products > 1', () => {
    component.selectedProducts = [{ type: '0' }, { type: '1' }, { type: '0' }] as any;

    const result = component.validateShowPdfButton();

    expect(result.showPdfButton).toBe(true);
    expect(result.ToolsType0.length).toBe(2);
    expect(result.buttonMessage).toBe('Download Files [2]');
  });

  it('should filter products data correctly', () => {
    component.backInfo = [
      { id: 1, category_id: 1, role_id: 1, stage_id: 1, importance_level: 'Very important' },
      { id: 2, category_id: 1, role_id: 1, stage_id: 1, importance_level: 'Useful' },
      { id: 3, category_id: 1, role_id: 1, stage_id: 1, importance_level: 'Important' },
    ] as any;
    component.selectedRole = { id: 1 } as any;
    component.selectedWhen = { id: 1 } as any;
    component.selectedWhat = { id: 1 } as any;

    component.filterInformation();

    expect(component.productsData.length).toBe(3);
    expect(component.productsData[0].id).toBe(1);
    expect(component.productsData).toEqual([
      { id: 1, category_id: 1, role_id: 1, stage_id: 1, importance_level: 'Very important' },
      { id: 3, category_id: 1, role_id: 1, stage_id: 1, importance_level: 'Important' },
      { id: 2, category_id: 1, role_id: 1, stage_id: 1, importance_level: 'Useful' },
    ]);
  });

  it('should return correct importance level color', () => {
    expect(component.getImportanceLevelColor('Very important')).toBe('#c0504d');
    expect(component.getImportanceLevelColor('Important')).toBe('#c0504d');
    expect(component.getImportanceLevelColor('Useful')).toBe('#e6b8b7');
    expect(component.getImportanceLevelColor('Optional')).toBe('#d6d6d6');
    expect(component.getImportanceLevelColor('Other')).toBe('Low');
  });

  it('should reset values on initNewSearch', () => {
    component.selectedRole = { id: 1 } as any;
    component.selectedWhat = { id: 1 } as any;
    component.selectedWhen = { id: 1 } as any;
    component.selectedProducts = [{ id: 1 } as any];

    component.initNewSearch();

    expect(component.selectedRole).toBeNull();
    expect(component.selectedWhat).toBeNull();
    expect(component.selectedWhen).toBeNull();
    expect(component.selectedProducts.length).toBe(0);
    expect(mockServicesTermsService.continue).toBe(false);
    expect(mockServicesTermsService.termsConditions).toBe(false);
  });

  it('should call resetValues on destroy', () => {
    component.ngOnDestroy();
    expect(mockServicesTermsService.resetValues).toHaveBeenCalled();
  });
});
