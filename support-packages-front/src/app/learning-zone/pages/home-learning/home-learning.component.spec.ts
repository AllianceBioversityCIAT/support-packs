import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeLearningComponent } from './home-learning.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

describe('HomeLearningComponent', () => {
  let component: HomeLearningComponent;
  let fixture: ComponentFixture<HomeLearningComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeLearningComponent],
      imports: [HttpClientTestingModule, DropdownModule, FormsModule],
    });
    fixture = TestBed.createComponent(HomeLearningComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
