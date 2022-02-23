import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SPTermsconditionsComponent } from './sp-termsconditions.component';

describe('SPTermsconditionsComponent', () => {
  let component: SPTermsconditionsComponent;
  let fixture: ComponentFixture<SPTermsconditionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SPTermsconditionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SPTermsconditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
