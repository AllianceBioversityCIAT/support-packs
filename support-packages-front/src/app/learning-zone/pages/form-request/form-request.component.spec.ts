import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRequestComponent } from './form-request.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

describe('FormRequestComponent', () => {
  let component: FormRequestComponent;
  let fixture: ComponentFixture<FormRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormRequestComponent],
      imports: [HttpClientTestingModule, DialogModule, ButtonModule],
    });
    fixture = TestBed.createComponent(FormRequestComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
