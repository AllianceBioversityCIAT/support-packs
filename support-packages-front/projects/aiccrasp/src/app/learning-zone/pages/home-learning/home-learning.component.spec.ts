import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeLearningComponent } from './home-learning.component';

describe('HomeLearningComponent', () => {
  let component: HomeLearningComponent;
  let fixture: ComponentFixture<HomeLearningComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeLearningComponent]
    });
    fixture = TestBed.createComponent(HomeLearningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
