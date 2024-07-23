import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MenubarModule } from 'primeng/menubar';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import { SideMenuComponent } from './side-menu.component';
import { of } from 'rxjs';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { RouterTestingModule } from '@angular/router/testing';

describe('SideMenuComponent', () => {
  let component: SideMenuComponent;
  let fixture: ComponentFixture<SideMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MenubarModule,
        DialogModule,
        TableModule,
        ButtonModule,
        AutoCompleteModule,
        RouterTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SideMenuComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAllTools on init', () => {
    jest.spyOn(component, 'getAllTools');

    component.ngOnInit();

    expect(component.getAllTools).toHaveBeenCalled();
  });

  it('should call getAllTools', () => {
    const getAllToolsSpy = jest
      .spyOn(component['_sharedService'], 'getAllToolsWithoutImportantLevels')
      .mockReturnValue(of([]));

    component.getAllTools();

    expect(getAllToolsSpy).toHaveBeenCalled();
  });

  it('should filter products', () => {
    const event = { query: 'query' };
    component.productsData = [{ name: 'name' }];
    component['_servicesVariables'].selectedProducts = [{ id: 1 } as any];

    component.filterProducts(event as any);

    expect(component.filteredProducts).toEqual([]);
  });

  it('should return if event is a string', () => {
    const event = 'string';

    const result = component.onProductChange(event);

    expect(result).toBeUndefined();
  });

  it('should set searchedTools to false if productsData is empty', () => {
    const event = [{ id: 1 }];
    component.productsData = [];
    component['_servicesVariables'].selectedProducts = [{ id: 1 } as any];

    component.onProductChange(event);

    expect(component['_servicesVariables'].searchedTools).toBeFalsy();
  });

  it('should set searchedTools to true and selectedProducts to event', () => {
    const event = [{ id: 1 }];
    component.productsData = [{ name: 'name' }];
    component['_servicesVariables'].selectedProducts = [];

    component.onProductChange(event);

    expect(component['_servicesVariables'].searchedTools).toBeTruthy();
    expect(component['_servicesVariables'].selectedProducts).toEqual(event);
  });

  it('should set searchedTools to false if selectedProducts is empty', () => {
    const event = [];
    component.productsData = [{ name: 'name' }];
    component['_servicesVariables'].selectedProducts = [];

    component.onProductChange(event);

    expect(component['_servicesVariables'].searchedTools).toBeFalsy();
  });

  it('should set visible to true when openDialog is called', () => {
    component.showDialog();

    expect(component.visible).toBeTruthy();
  });

  it('should set loading to false after getting information', () => {
    jest.spyOn(component['_sharedService'], 'getToolOverview').mockReturnValue(of([]));

    component.getInformation();

    expect(component.loading).toBeFalsy();
  });

  it('should return the correct importance level and style color', () => {
    const acronym = 'ACR';
    const proposal = 'Proposal';
    const data = [
      { acronym: 'ACR', name: 'Proposal', importance_level: 'Very important' },
      { acronym: 'ACR', name: 'Proposal', importance_level: 'Useful' },
    ];
    const expected = { important: 4, styleColor: 'veryImportant' };

    const result = component.getImportants(acronym, proposal, data, null);

    expect(result).toEqual(expected);
  });

  it('should return default importance level and style color if no match found', () => {
    const acronym = 'ACR';
    const proposal = 'Proposal';
    const data = [
      { acronym: 'ACR', name: 'Other Proposal', importance_level: 'Important' },
      { acronym: 'Other ACR', name: 'Proposal', importance_level: 'Useful' },
    ];
    const expected = { important: 0, styleColor: '' };

    const result = component.getImportants(acronym, proposal, data, null);

    expect(result).toEqual(expected);
  });
});
