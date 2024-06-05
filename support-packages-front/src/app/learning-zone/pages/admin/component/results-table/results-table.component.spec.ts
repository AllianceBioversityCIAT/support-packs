import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsTableComponent } from './results-table.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';

describe('ResultsTableComponent', () => {
  let component: ResultsTableComponent;
  let fixture: ComponentFixture<ResultsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResultsTableComponent],
      imports: [HttpClientTestingModule, DialogModule, TableModule],
    });
    fixture = TestBed.createComponent(ResultsTableComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
