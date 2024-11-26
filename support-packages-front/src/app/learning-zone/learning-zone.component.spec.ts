import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningZoneComponent } from './learning-zone.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MenubarModule } from 'primeng/menubar';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LearningZoneComponent', () => {
  let component: LearningZoneComponent;
  let fixture: ComponentFixture<LearningZoneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MenubarModule,
        DialogModule,
        TableModule,
        FormsModule,
        ButtonModule,
      ],
    });
    fixture = TestBed.createComponent(LearningZoneComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call NgOnInit', () => {
    const spy = jest.spyOn(component, 'ngOnInit');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });
});
