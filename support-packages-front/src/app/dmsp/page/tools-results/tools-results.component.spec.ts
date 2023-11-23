import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsResultsComponent } from './tools-results.component';

describe('ToolsResultsComponent', () => {
  let component: ToolsResultsComponent;
  let fixture: ComponentFixture<ToolsResultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToolsResultsComponent]
    });
    fixture = TestBed.createComponent(ToolsResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
