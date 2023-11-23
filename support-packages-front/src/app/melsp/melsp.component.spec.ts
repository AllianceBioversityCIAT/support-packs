import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MelspComponent } from './melsp.component';

describe('MelspComponent', () => {
  let component: MelspComponent;
  let fixture: ComponentFixture<MelspComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MelspComponent]
    });
    fixture = TestBed.createComponent(MelspComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
