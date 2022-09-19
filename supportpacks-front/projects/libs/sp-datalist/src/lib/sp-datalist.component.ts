import { animate, style, transition, trigger } from '@angular/animations';
import {
  EventEmitter,
  Input,
  KeyValueDiffer,
  KeyValueDiffers,
  OnChanges,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataListService } from './sp-datalist.service';
import { GuidelineRSC } from './sp-datalist.models';

const tcText = {
  txt1: `To continue downloading your files, please first fill in your email and then some basic information.
  This information will be used by CCAFS solely for impact assessment and CGIAR and Center level reporting purposes.
  Filling it in will greatly help us to track the use of the portal and keep improving it.
  This portal provides data to a very large community of users and improving its usability and efficiency is
  a key aspect we work on continuously.
  However, you may click on `,
  txt2: '<a class="skip 2" (Click)="onSetEmail()">Skip</a> ',
  txt3: 'to download links directly.',
};
@Component({
  selector: 'dl-lib',
  templateUrl: './sp-datalist.component.html',
  styleUrls: ['./sp-datalist.component.scss'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        // css styles at start of transition
        style({ opacity: 0 }),

        // animation and styles at end of transition
        animate('.3s', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        // css styles at start of transition
        style({ opacity: 1 }),

        // animation and styles at end of transition
        animate('.3s', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class DataListComponent implements OnInit, OnChanges {
  @Input() app_id: any;
  @Input() data: any = {
    role: null,
    stage: null,
    category: null,
  };
  @Input() ids: [];
  @Output() rData = new EventEmitter<any>();

  private customerDiffer: KeyValueDiffer<string, any>;

  recomendedDocs: GuidelineRSC[] = [];
  selectedArray: GuidelineRSC[] = [];
  selectedData = [];
  form: FormGroup;
  isVisible = true;
  tcText = tcText;

  constructor(
    private listServices: DataListService,
    private fb: FormBuilder,
    private differs: KeyValueDiffers,
    private spinner: NgxSpinnerService
  ) {
    this.form = this.fb.group({
      docsArray: this.fb.array([], [Validators.required]),
    });
    if (this.data) {
      this.customerDiffer = this.differs.find(this.data).create();
    }
  }

  ngOnInit() {}
  ngOnChanges(changes: { [property: string]: SimpleChange }) {
    // Extract changes to the input property by its name
    this.form = this.fb.group({
      docsArray: this.fb.array([], [Validators.required]),
    });
    for (const propName of Object.keys(changes)) {
      const changedProp = changes[propName];
      if (this.listServices.hasNull(changedProp.currentValue) && propName === 'ids') {
        this.spinner.show();
        this.loadComponent(changedProp.currentValue);
      } else {
        this.resetData();
      }
    }
  }

  restartData() {
    this.rData.emit({
      role: null,
      stage: null,
      category: null,
    });
  }

  resetData() {
    this.selectedArray = [];
    this.recomendedDocs = [];
    this.isVisible = false;
  }

  onBack(ev) {
    this.isVisible = false;
    this.form = this.fb.group({
      docsArray: this.fb.array([], [Validators.required]),
    });
    this.selectedArray = [];
    this.selectedData = [];
  }

  loadComponent(params: any) {
    // this.isVisible = false;
    this.recomendedDocs = [];
    this.form.reset();
    this.listServices.getRSC(params).subscribe(
      (res) => {
        this.spinner.hide();
        this.selectedData = [];
        this.selectedArray = [];
        this.recomendedDocs = res;
        console.log(this.form);

        // console.log('res', this.recomendedDocs);
      },
      (error) => {
        this.spinner.hide();
        console.error(error);
      }
    );
  }

  validateFilterData() {
    return this.data.role && this.data.stage && this.data.category && !this.isVisible;
  }

  onCheckboxChange(e: Event) {
    const docsArray: FormArray = this.form.get('docsArray') as FormArray;
    // console.log(e);
    if ((e.target as HTMLInputElement).checked) {
      docsArray.push(new FormControl((e.target as HTMLInputElement).value));
      this.selectedData.push(this.recomendedDocs.find((doc) => +(e.target as HTMLInputElement).value === doc.id));
    } else {
      let i = 0;
      docsArray.controls.forEach((item: FormControl) => {
        if (item.value === (e.target as HTMLInputElement).value) {
          docsArray.removeAt(i);
          this.selectedData.splice(i, 1);
          return;
        }
        i++;
      });
    }
  }

  submitForm() {
    this.selectedArray = this.form.value['docsArray'];
    this.isVisible = true;
  }

  isYoutube(url) {
    const p =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    return url.match(p) ? '1' : '0';
  }
}
