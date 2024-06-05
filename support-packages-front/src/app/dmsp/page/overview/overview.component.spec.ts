import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewComponent } from './overview.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TableModule } from 'primeng/table';

describe('OverviewComponent', () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OverviewComponent],
      imports: [HttpClientTestingModule, TableModule],
    });
    fixture = TestBed.createComponent(OverviewComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
