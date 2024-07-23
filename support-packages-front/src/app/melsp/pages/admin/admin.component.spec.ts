import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenubarModule } from 'primeng/menubar';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MenubarModule, FormsModule],
    });
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
