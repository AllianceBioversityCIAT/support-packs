import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { HomeLearningComponent } from './home-learning.component';
import { of } from 'rxjs';

describe('HomeLearningComponent', () => {
  let component: HomeLearningComponent;
  let fixture: ComponentFixture<HomeLearningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeLearningComponent],
      imports: [HttpClientTestingModule, DropdownModule, FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeLearningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAllTools and getAllFilters methods on ngOnInit', () => {
    jest.spyOn(component, 'getAllTools');
    jest.spyOn(component, 'getAllFilters');

    component.ngOnInit();

    expect(component.getAllTools).toHaveBeenCalled();
    expect(component.getAllFilters).toHaveBeenCalled();
  });

  it('should set termsConditions and continue to false on goBackToTable method', () => {
    component._servicesVariables.termsConditions = true;
    component._servicesVariables.continue = true;

    component.goBackToTable();

    expect(component._servicesVariables.termsConditions).toBeFalsy();
    expect(component._servicesVariables.continue).toBeFalsy();
  });

  it('should call getAllTools method on getAllTools method', () => {
    jest.spyOn(component._sharedService, 'getAllTools').mockReturnValue(of({}));

    component.getAllTools();

    expect(component._sharedService.getAllTools).toHaveBeenCalled();
  });

  it('should return true if any of the filter arrays is empty on disableButton method', () => {
    component.thematicAreasData = [];
    component.targetUserData = [{ id: 1, name: 'Target User 1' } as any];
    component.projectPhaseData = [{ id: 1, name: 'Project Phase 1' } as any];

    expect(component.disableButton()).toBeTruthy();
  });

  it('should return false if filter arrays is not empty on disableButton method', () => {
    component.thematicAreasData = [{ id: 1, name: 'Thematic Area 1' } as any];
    component.targetUserData = [{ id: 1, name: 'Thematic Area 1' } as any];
    component.projectPhaseData = [{ id: 1, name: 'Project Phase 1' } as any];

    expect(component.disableButton()).toBeFalsy();
  });

  it('should filter productsData based on selected filters on filterInformation method', () => {
    component.backInfo = [
      { id_cat: 1, id_rol: 1, id_stage: 1 },
      { id_cat: 2, id_rol: 2, id_stage: 2 },
      { id_cat: 3, id_rol: 3, id_stage: 3 },
    ] as any;
    component.selectedThematicAreas = { id: 1, name: 'Thematic Area 1', app_id: 1 };
    component.selectedTargetUser = { id: 1, name: 'Target User 1', app_id: 1, acronym: 'TU1' };
    component.selectedProjectUser = {
      id: 1,
      name: 'Project Phase 1',
      app_id: 1,
      description: 'Phase 1',
    };

    component.filterInformation();

    expect(component.productsData).toEqual([{ id_cat: 1, id_rol: 1, id_stage: 1 }]);
  });

  it('should sort productsData based on importance level on filterInformation method', () => {
    component.backInfo = [
      { importance_level: 'Important' },
      { id_cat: 1, id_rol: 1, id_stage: 1, importance_level: 'Optional' },
      { id_cat: 1, id_rol: 1, id_stage: 1, importance_level: 'Useful' },
      { id_cat: 1, id_rol: 1, id_stage: 1, importance_level: 'Very important' },
    ] as any;
    component.selectedThematicAreas = { id: 1, name: 'Thematic Area 1', app_id: 1 };
    component.selectedTargetUser = { id: 1, name: 'Target User 1', app_id: 1, acronym: 'TU1' };
    component.selectedProjectUser = {
      id: 1,
      name: 'Project Phase 1',
      app_id: 1,
      description: 'Phase 1',
    };

    component.filterInformation();

    expect(component.productsData).toEqual([
      { id_cat: 1, id_rol: 1, id_stage: 1, importance_level: 'Very important' },
      { id_cat: 1, id_rol: 1, id_stage: 1, importance_level: 'Useful' },
      { id_cat: 1, id_rol: 1, id_stage: 1, importance_level: 'Optional' },
    ]);
  });

  it('should filter productsData based on selected filters on filterInformation method', () => {
    component.backInfo = [
      { id_cat: 1, id_rol: 1, id_stage: 1 },
      { id_cat: 2, id_rol: 2, id_stage: 2 },
      { id_cat: 3, id_rol: 3, id_stage: 3 },
    ] as any;
    component.selectedThematicAreas = { id: 1, name: 'Thematic Area 1', app_id: 1 };
    component.selectedTargetUser = { id: 1, name: 'Target User 1', app_id: 1, acronym: 'TU1' };
    component.selectedProjectUser = {
      id: 1,
      name: 'Project Phase 1',
      app_id: 1,
      description: 'Phase 1',
    };

    component.filterInformation();

    expect(component.productsData).toEqual([{ id_cat: 1, id_rol: 1, id_stage: 1 }]);
  });

  it('should return the correct color based on importance level on getImportanceLevelColor method', () => {
    expect(component.getImportanceLevelColor('Very important')).toBe('#009875');
    expect(component.getImportanceLevelColor('Important')).toBe('#06AEAD');
    expect(component.getImportanceLevelColor('Useful')).toBe('#72CC50');
    expect(component.getImportanceLevelColor('Optional')).toBe('#C2C2C2');
    expect(component.getImportanceLevelColor('Low')).toBe('Low');
  });

  it('should reset selected filters and productsData on initNewSearch method', () => {
    component.selectedThematicAreas = { id: 1, name: 'Thematic Area 1', app_id: 1 };
    component.selectedTargetUser = { id: 1, name: 'Target User 1', app_id: 1, acronym: 'TU1' };
    component.selectedProjectUser = {
      id: 1,
      name: 'Project Phase 1',
      app_id: 1,
      description: 'Phase 1',
    };
    component.productsData = [{ id: 1, name: 'Product 1' } as any];
    component.selectedProducts = [{ id: 1, name: 'Product 1' } as any];

    component.initNewSearch();

    expect(component.selectedThematicAreas).toBeUndefined();
    expect(component.selectedTargetUser).toBeUndefined();
    expect(component.selectedProjectUser).toBeUndefined();
    expect(component.productsData).toEqual(component.backInfo);
    expect(component.selectedProducts).toEqual([]);
  });

  it('should call resetValues method on ngOnDestroy method', () => {
    jest.spyOn(component._servicesVariables, 'resetValues');

    component.ngOnDestroy();

    expect(component._servicesVariables.resetValues).toHaveBeenCalled();
  });
});
