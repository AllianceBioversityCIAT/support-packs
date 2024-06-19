import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToolsResultsComponent } from './tools-results.component';
import { SharedService } from '../../../shared/services/shared.service';
import { ServicesTermsService } from '../../../shared/services/services-terms.service';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ToolsResultsComponent', () => {
  let component: ToolsResultsComponent;
  let fixture: ComponentFixture<ToolsResultsComponent>;
  let mockSharedService;
  let mockServicesTermsService;

  beforeEach(() => {
    mockSharedService = {
      getSPFilters: jest.fn().mockReturnValue(
        of({
          result: {
            categories: [{ id: 1, name: 'Category 1', selected: true }],
            roles: [{ id: 1, name: 'Role 1', selected: true }],
            stage: [{ id: 1, name: 'Stage 1', selected: true }],
          },
        }),
      ),
      getAllTools: jest.fn().mockReturnValue(
        of({
          result: [
            {
              id: 1,
              name: 'Tool 1',
              type: '0',
              category_id: 1,
              role_id: 1,
              stage_id: 1,
              importance_level: 'Very important',
            },
          ],
        }),
      ),
    };

    mockServicesTermsService = {
      termsConditions: false,
      continue: false,
    };

    TestBed.configureTestingModule({
      declarations: [ToolsResultsComponent],
      imports: [BrowserAnimationsModule],
      providers: [
        { provide: SharedService, useValue: mockSharedService },
        { provide: ServicesTermsService, useValue: mockServicesTermsService },
      ],
    });

    fixture = TestBed.createComponent(ToolsResultsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getFilters on ngOnInit', () => {
    jest.spyOn(component, 'getFilters');

    component.ngOnInit();

    expect(component.getFilters).toHaveBeenCalled();
  });

  it('should call getTools on ngOnInit', () => {
    jest.spyOn(component, 'getTools');

    component.ngOnInit();

    expect(component.getTools).toHaveBeenCalled();
  });

  it('should set correct icon for each type', () => {
    expect(component.getIconByType('0')).toBe('pi pi-file');
    expect(component.getIconByType('1')).toBe('pi pi-youtube');
    expect(component.getIconByType('2')).toBe('pi pi-paperclip');
    expect(component.getIconByType('3')).toBe('');
  });

  it('should validate showPdfButton', () => {
    component.selectedProducts = [
      { id: 1, type: '0' },
      { id: 2, type: '1' },
    ];
    const result = component.validateShowPdfButton();

    expect(result.showPdfButton).toBe(true);
    expect(result.ToolsType0.length).toBe(1);
    expect(result.buttonMessage).toBe('Download File');
  });

  it('should validate showPdfButton when selectedProducts > 2', () => {
    component.selectedProducts = [
      { id: 1, type: '0' },
      { id: 2, type: '0' },
      { id: 3, type: '0' },
    ];
    const result = component.validateShowPdfButton();

    expect(result.showPdfButton).toBe(true);
    expect(result.ToolsType0.length).toBe(3);
    expect(result.buttonMessage).toBe('Download Files [3]');
  });

  it('should get filters and update data', () => {
    component.getFilters();

    fixture.detectChanges();

    expect(component.whatData.length).toBe(1);
    expect(component.rolesData.length).toBe(1);
    expect(component.whenData.length).toBe(1);
  });

  it('should get tools and update productsData', () => {
    component.getTools();

    fixture.detectChanges();

    expect(component.productsData.length).toBe(1);
  });

  it('should filter information based on selected filters', () => {
    component.selectedRole = {
      id: 1,
      name: 'Role 1',
      acronym: '',
      app_id: 1,
      img: '',
      selected: true,
    };
    component.selectedWhen = { id: 1, name: 'Stage 1', app_id: 1, description: '', selected: true };
    component.selectedWhat = { id: 1, name: 'Category 1', app_id: 1, selected: true };
    component.backInfo = [
      {
        id: 1,
        category_id: 1,
        role_id: 1,
        stage_id: 1,
        importance_level: 'Very important',
      },
      {
        id: 2,
        category_id: 1,
        role_id: 1,
        stage_id: 1,
        importance_level: 'Useful',
      },
      {
        id: 3,
        category_id: 1,
        role_id: 1,
        stage_id: 1,
        importance_level: 'Important',
      },
    ];

    component.filterInformation();

    expect(component.productsData.length).toBe(3);
    expect(component.productsData).toEqual([
      { id: 1, category_id: 1, role_id: 1, stage_id: 1, importance_level: 'Very important' },
      { id: 3, category_id: 1, role_id: 1, stage_id: 1, importance_level: 'Important' },
      { id: 2, category_id: 1, role_id: 1, stage_id: 1, importance_level: 'Useful' },
    ]);
  });

  it('should return correct color based on importance level', () => {
    expect(component.getImportanceLevelColor('Very important')).toBe('#c0504d');
    expect(component.getImportanceLevelColor('Important')).toBe('#cc7876');
    expect(component.getImportanceLevelColor('Useful')).toBe('#e6b8b7');
    expect(component.getImportanceLevelColor('Optional')).toBe('#d6d6d6');
    expect(component.getImportanceLevelColor('Unknown')).toBe('Low');
  });

  it('should reset filters and scroll to top on initNewSearch', () => {
    window.scrollTo = jest.fn();
    const whatData = [{ id: 1, name: 'Category 1', app_id: 1, selected: false }];
    const whenData = [{ id: 1, name: 'Stage 1', app_id: 1, description: '', selected: false }];
    const rolesData = [{ id: 1, name: 'Role 1', app_id: 1, acronym: '', img: '', selected: false }];

    component.whatData = whatData;
    component.whenData = whenData;
    component.rolesData = rolesData;

    component.initNewSearch();

    expect(component.selectedRole).toBeNull();
    expect(component.selectedWhat).toBeNull();
    expect(component.selectedWhen).toBeNull();
    expect(whatData[0].selected).toBe(true);
    expect(whenData[0].selected).toBe(true);
    expect(rolesData[0].selected).toBe(true);
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it('should change item status correctly when type is role', () => {
    const role = { id: 1, name: 'Role 1', acronym: '', app_id: 1, img: '', selected: false };
    component.rolesData = [
      { id: 1, name: 'Role 1', acronym: '', app_id: 1, img: '', selected: false },
    ];

    component.changesItemStatus(role, 'role');

    expect(role.selected).toBe(true);
    expect(component.rolesData[0].selected).toBe(false);
  });

  it('should change item status correctly when type is role', () => {
    const when = { id: 1, name: 'Role 1', app_id: 1, description: '', selected: false };
    component.whenData = [{ id: 1, name: 'Role 1', app_id: 1, description: '', selected: false }];

    component.changesItemStatus(when, 'when');

    expect(when.selected).toBe(true);
    expect(component.whenData[0].selected).toBe(false);
  });

  it('should change item status correctly when type is role', () => {
    const what = { id: 1, name: 'Role 1', app_id: 1, selected: false };
    component.whatData = [{ id: 1, name: 'Role 1', app_id: 1, selected: false }];

    component.changesItemStatus(what, 'what');

    expect(what.selected).toBe(true);
    expect(component.whatData[0].selected).toBe(false);
  });
});
