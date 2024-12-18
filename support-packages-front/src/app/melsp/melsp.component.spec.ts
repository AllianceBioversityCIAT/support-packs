import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MelspComponent } from './melsp.component';
import { MenubarModule } from 'primeng/menubar';
import { FormsModule } from '@angular/forms';

describe('MelspComponent', () => {
  let component: MelspComponent;
  let fixture: ComponentFixture<MelspComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MenubarModule, FormsModule],
    });
    fixture = TestBed.createComponent(MelspComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call NgOnInit', () => {
    const spy = jest.spyOn(component, 'ngOnInit');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });
});
