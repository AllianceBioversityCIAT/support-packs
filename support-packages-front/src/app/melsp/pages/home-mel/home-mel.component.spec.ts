import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMelComponent } from './home-mel.component';

describe('HomeMelComponent', () => {
  let component: HomeMelComponent;
  let fixture: ComponentFixture<HomeMelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeMelComponent]
    });
    fixture = TestBed.createComponent(HomeMelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
