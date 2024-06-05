import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfGenerateComponent } from './pdf-generate.component';
import { ButtonModule } from 'primeng/button';

describe('PdfGenerateComponent', () => {
  let component: PdfGenerateComponent;
  let fixture: ComponentFixture<PdfGenerateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PdfGenerateComponent],
      imports: [ButtonModule],
    });
    fixture = TestBed.createComponent(PdfGenerateComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
