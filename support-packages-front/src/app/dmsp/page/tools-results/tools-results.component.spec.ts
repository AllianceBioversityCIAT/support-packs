import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsResultsComponent } from './tools-results.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ToolsResultsComponent', () => {
  let component: ToolsResultsComponent;
  let fixture: ComponentFixture<ToolsResultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToolsResultsComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(ToolsResultsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
