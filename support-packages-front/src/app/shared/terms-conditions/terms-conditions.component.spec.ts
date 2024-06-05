import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsConditionsComponent } from './terms-conditions.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

describe('TermsConditionsComponent', () => {
  let component: TermsConditionsComponent;
  let fixture: ComponentFixture<TermsConditionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermsConditionsComponent],
      imports: [HttpClientTestingModule, FormsModule, ButtonModule],
    });
    fixture = TestBed.createComponent(TermsConditionsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
