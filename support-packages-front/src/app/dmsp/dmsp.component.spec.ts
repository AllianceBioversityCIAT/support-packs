import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmspComponent } from './dmsp.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('DmspComponent', () => {
  let component: DmspComponent;
  let fixture: ComponentFixture<DmspComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    });
    fixture = TestBed.createComponent(DmspComponent);
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
