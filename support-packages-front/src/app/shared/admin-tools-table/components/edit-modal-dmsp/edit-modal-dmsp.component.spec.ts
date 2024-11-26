import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditModalDmspComponent } from './edit-modal-dmsp.component';
import { SharedService } from '../../../services/shared.service';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FileUploadModule } from 'primeng/fileupload';

describe('EditModalDmspComponent', () => {
  let component: EditModalDmspComponent;
  let fixture: ComponentFixture<EditModalDmspComponent>;
  let sharedService: SharedService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        DropdownModule,
        ButtonModule,
        InputTextModule,
        RadioButtonModule,
        FileUploadModule,
        EditModalDmspComponent,
      ],
      declarations: [],
      providers: [
        {
          provide: SharedService,
          useValue: {
            removeFile: jest.fn(),
            uploadFile: jest.fn(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditModalDmspComponent);
    component = fixture.componentInstance;
    sharedService = TestBed.inject(SharedService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize informationEdit.isLink to false on ngOnInit', () => {
    component.informationEdit = {};
    component.ngOnInit();
    expect(component.informationEdit.isLink).toBe(false);
  });

  it('should remove file and update informationEdit.source on removeFile', () => {
    const mockFile = { key: 'testKey' };
    jest.spyOn(sharedService, 'removeFile').mockReturnValue(of({}));
    component.informationEdit = { source: 'testSource' };

    component.removeFile(mockFile);

    expect(component.uploadedFile).toBeNull();
    expect(sharedService.removeFile).toHaveBeenCalledWith('testKey');
    expect(component.informationEdit.source).toBe('');
  });

  it('should handle error on removeFile', () => {
    const mockFile = { key: 'testKey' };
    const consoleSpy = jest.spyOn(console, 'error');
    jest.spyOn(sharedService, 'removeFile').mockReturnValue(throwError('error'));

    component.removeFile(mockFile);

    expect(consoleSpy).toHaveBeenCalledWith('error');
  });

  it('should upload file and update informationEdit.source on onBasicUploadAuto', () => {
    const mockEvent = { files: [{ name: 'testFile' }] };
    const mockResponse = { fileUrl: 'testUrl', fileName: 'testFile', key: 'testKey' };
    jest.spyOn(sharedService, 'uploadFile').mockReturnValue(of(mockResponse));
    component.informationEdit = {};

    component.onBasicUploadAuto(mockEvent);

    expect(component.uploadedFile).toEqual({
      name: 'testFile',
      url: 'testUrl',
      key: 'testKey',
    });
    expect(component.informationEdit.source).toBe('testUrl');
  });

  it('should handle error on onBasicUploadAuto', () => {
    const mockEvent = { files: [{ name: 'testFile' }] };
    const consoleSpy = jest.spyOn(console, 'error');
    jest.spyOn(sharedService, 'uploadFile').mockReturnValue(throwError('error'));

    component.onBasicUploadAuto(mockEvent);

    expect(consoleSpy).toHaveBeenCalledWith('error');
  });

  it('should emit onEditTool event on editTool', () => {
    jest.spyOn(component.onEditTool, 'emit');

    component.editTool();

    expect(component.onEditTool.emit).toHaveBeenCalled();
  });
});
