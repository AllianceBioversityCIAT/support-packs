import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolInactiveComponent } from './tool-inactive.component';

describe('ToolInactiveComponent', () => {
  let component: ToolInactiveComponent;
  let fixture: ComponentFixture<ToolInactiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToolInactiveComponent]
    });
    fixture = TestBed.createComponent(ToolInactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
