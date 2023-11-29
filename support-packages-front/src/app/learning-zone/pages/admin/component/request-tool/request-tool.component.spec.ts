import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestToolComponent } from './request-tool.component';

describe('RequestToolComponent', () => {
  let component: RequestToolComponent;
  let fixture: ComponentFixture<RequestToolComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestToolComponent]
    });
    fixture = TestBed.createComponent(RequestToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
