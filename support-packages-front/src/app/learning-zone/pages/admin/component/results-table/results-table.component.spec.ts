import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ResultsTableComponent } from './results-table.component';
import { of } from 'rxjs';

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

  it('should emit onGetActiveTools when getActiveTools is called', () => {
    jest.spyOn(component.onGetActiveTools, 'emit');

    component.getActiveTools();

    expect(component.onGetActiveTools.emit).toHaveBeenCalled();
  });

  it('should emit onGetRequestedTools when getRequestedTools is called', () => {
    jest.spyOn(component.onGetRequestedTools, 'emit');

    component.getRequestedTools();

    expect(component.onGetRequestedTools.emit).toHaveBeenCalled();
  });

  it('should emit onGetDesactiveTools when getDesactiveTools is called', () => {
    jest.spyOn(component.onGetDesactiveTools, 'emit');

    component.getDesactiveTools();

    expect(component.onGetDesactiveTools.emit).toHaveBeenCalled();
  });

  it('should set step1 to true and step2 to false when button1Validations is called', () => {
    component.step1 = false;
    component.step2 = true;

    component.button1Validations();

    expect(component.step1).toBe(true);
    expect(component.step2).toBe(false);
  });

  it('should set step1 to false and step2 to true when button2Validations is called', () => {
    component.step1 = true;
    component.step2 = false;

    component.button2Validations();

    expect(component.step1).toBe(false);
    expect(component.step2).toBe(true);
  });

  it('should set EditModalOpen to true and informationEdit to the provided tool when showEditDialog is called', () => {
    const tool = { id: 1, name: 'Tool 1' };
    component.EditModalOpen = false;
    component.informationEdit = null;

    component.showEditDialog(tool);

    expect(component.EditModalOpen).toBe(true);
    expect(component.informationEdit).toEqual(tool);
  });

  it('should set EditModalOpen to false, step1 to true, and step2 to false when onCloseEditModal is called', () => {
    component.EditModalOpen = true;
    component.step1 = false;
    component.step2 = true;

    component.onCloseEditModal();

    expect(component.EditModalOpen).toBe(false);
    expect(component.step1).toBe(true);
    expect(component.step2).toBe(false);
  });

  it('should set isSaving to true and call putTool when editTool is called with activeItem.id equal to 0', () => {
    const tool = { id: 1, name: 'Tool 1' };
    component.activeItem = { id: 0 };
    const spyPutTool = jest
      .spyOn(component._servicesLearningZoneService, 'putTool')
      .mockReturnValue(of({}));

    const spyGetActiveTools = jest.spyOn(component, 'getActiveTools');
    component.isSaving = false;
    component.informationEdit = tool;

    component.editTool();

    expect(spyPutTool).toHaveBeenCalledWith(tool);
    expect(spyGetActiveTools).toHaveBeenCalled();
  });

  it('should set isSaving to true and call putToolRequest when editTool is called with activeItem.id equal to 2', () => {
    const tool = { id: 1, name: 'Tool 1' };
    component.activeItem = { id: 2 };

    const spyPutToolRequest = jest
      .spyOn(component._servicesLearningZoneService, 'putToolRequest')
      .mockReturnValue(of({}));

    const spyGetRequestedTools = jest.spyOn(component, 'getRequestedTools');

    component.isSaving = false;
    component.informationEdit = tool;

    component.editTool();

    expect(spyPutToolRequest).toHaveBeenCalledWith(tool);
    expect(spyGetRequestedTools).toHaveBeenCalled();
  });

  it('should set desactiveModalOpen to true and informationEdit to the provided customer when showDialogDesactive is called', () => {
    const customer = { id: 1, name: 'Customer 1' };
    component.desactiveModalOpen = false;
    component.informationEdit = null;

    component.showDialogDesactive(customer);

    expect(component.desactiveModalOpen).toBe(true);
    expect(component.informationEdit).toEqual(customer);
  });

  it('should set isSaving to true and call activeOrDesactive when handleDesactive is called with activeItem.id equal to 0', () => {
    const customer = { id: 1, name: 'Customer 1' };
    component.activeItem = { id: 0 };

    const spyActiveOrDesactive = jest
      .spyOn(component._servicesLearningZoneService, 'activeOrDesactive')
      .mockReturnValue(of({}));

    const spyGetActiveTools = jest.spyOn(component, 'getActiveTools');
    component.isSaving = false;
    component.informationEdit = customer;

    component.handleDesactive();

    expect(spyActiveOrDesactive).toHaveBeenCalledWith(customer, 0);
    expect(spyGetActiveTools).toHaveBeenCalled();
  });

  it('should set isSaving to true and call activeOrDesactive when handleDesactive is called with activeItem.id equal to 1', () => {
    const customer = { id: 1, name: 'Customer 1' };
    component.activeItem = { id: 1 };
    const spyActiveOrDesactive = jest
      .spyOn(component._servicesLearningZoneService, 'activeOrDesactive')
      .mockReturnValue(of({}));

    const spyGetDesactiveTools = jest.spyOn(component, 'getDesactiveTools');
    component.isSaving = false;
    component.informationEdit = customer;

    component.handleDesactive();

    expect(spyActiveOrDesactive).toHaveBeenCalledWith(customer, 1);
    expect(spyGetDesactiveTools).toHaveBeenCalled();
  });

  it('should set acceptedModalOpen to true and informationEdit to the provided tool when showDialogAccepted is called', () => {
    const tool = { id: 1, name: 'Tool 1' };
    component.acceptedModalOpen = false;
    component.informationEdit = null;

    component.showDialogAccepted(tool);

    expect(component.acceptedModalOpen).toBe(true);
    expect(component.informationEdit).toEqual(tool);
  });

  it('should set isSaving to true and call aceptedRequest when acceptRequest is called', () => {
    const tool = { id: 1, name: 'Tool 1' };

    const spyAceptedRequest = jest
      .spyOn(component._servicesLearningZoneService, 'aceptedRequest')
      .mockReturnValue(of({}));

    const spyGetRequestedTools = jest.spyOn(component, 'getRequestedTools');
    component.isSaving = false;
    component.informationEdit = tool;

    component.acceptRequest();

    expect(spyAceptedRequest).toHaveBeenCalledWith(tool);
    expect(spyGetRequestedTools).toHaveBeenCalled();
  });

  it('should set denyModalOpen to true and informationEdit to the provided tool when showDenyRequest is called', () => {
    const tool = { id: 1, name: 'Tool 1' };
    component.denyModalOpen = false;
    component.informationEdit = null;

    component.showDenyRequest(tool);

    expect(component.denyModalOpen).toBe(true);
    expect(component.informationEdit).toEqual(tool);
  });

  it('should set isSaving to true and call denyToolRequest when denyRequest is called', () => {
    const tool = { id: 1, name: 'Tool 1' };

    const spyDenyToolRequest = jest
      .spyOn(component._servicesLearningZoneService, 'denyToolRequest')
      .mockReturnValue(of({}));

    const spyGetRequestedTools = jest.spyOn(component, 'getRequestedTools');
    component.isSaving = false;
    component.informationEdit = tool;

    component.denyRequest();

    expect(spyDenyToolRequest).toHaveBeenCalledWith(tool);
    expect(spyGetRequestedTools).toHaveBeenCalled();
  });
});
