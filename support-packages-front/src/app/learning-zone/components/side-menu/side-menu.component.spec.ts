import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MenubarModule } from 'primeng/menubar';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { RouterTestingModule } from '@angular/router/testing';
import { ButtonModule } from 'primeng/button';

import { SideMenuComponent } from './side-menu.component';
import { of } from 'rxjs';

describe('SideMenuComponent', () => {
  let component: SideMenuComponent;
  let fixture: ComponentFixture<SideMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SideMenuComponent],
      imports: [
        HttpClientTestingModule,
        MenubarModule,
        DialogModule,
        TableModule,
        RouterTestingModule,
        ButtonModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set visible to true when openDialog is called', () => {
    component.showDialog();

    expect(component.visible).toBeTruthy();
  });

  it('should set loading to false after getting information', () => {
    jest
      .spyOn(component['_servicesLearningZoneService'], 'getToolOverview')
      .mockReturnValue(of([]));

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
