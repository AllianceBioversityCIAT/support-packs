import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMelComponent } from './home-mel.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

describe('HomeMelComponent', () => {
  let component: HomeMelComponent;
  let fixture: ComponentFixture<HomeMelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeMelComponent],
      imports: [HttpClientTestingModule, FormsModule, DropdownModule],
    });
    fixture = TestBed.createComponent(HomeMelComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
