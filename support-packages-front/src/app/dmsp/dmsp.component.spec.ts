import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmspComponent } from './dmsp.component';

describe('DmspComponent', () => {
  let component: DmspComponent;
  let fixture: ComponentFixture<DmspComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DmspComponent]
    });
    fixture = TestBed.createComponent(DmspComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
