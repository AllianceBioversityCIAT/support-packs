import { Component, OnInit, Input, OnDestroy, SimpleChange } from '@angular/core';
import { trigger, transition, style, animate, } from '@angular/animations';
import { SppServices } from '../services/spp-services.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(':enter', [

          // css styles at start of transition
          style({ opacity: 0 }),

          // animation and styles at end of transition
          animate('.3s', style({ opacity: 1 }))
        ]),
        transition(':leave', [
          // css styles at start of transition
          style({ opacity: 1 }),

          // animation and styles at end of transition
          animate('.3s', style({ opacity: 0 }))
        ])
      ]
    )
  ]
})
export class DataListComponent implements OnInit, OnDestroy {
  @Input() data: any;
  @Input() names: any;

  recomendedDocs = [];
  selectedArray = [];
  selectedData = [];
  form: FormGroup;
  isVisible = false;

  constructor(private fb: FormBuilder, private sppServices: SppServices, private spinner: NgxSpinnerService) {
    this.form = this.fb.group({
      docsArray: this.fb.array([], [Validators.required])
    })

  }

  ngOnInit() {
    // this.eventsSubscription = this.events.subscribe((data) => { console.log(data) });
  }

  ngOnDestroy() {
    // this.eventsSubscription.unsubscribe();
  }

  ngOnChanges(changes: { [property: string]: SimpleChange }) {
    // Extract changes to the input property by its name
    const log: string[] = [];
    for (const propName in changes) {
      const changedProp = changes[propName];
      if (this.hasNull(changedProp.currentValue) && propName == 'data') {
        this.loadComponent(changedProp.currentValue)
      } else {
        this.resetData();
      }
    }
  }

  onBack() {
    this.isVisible = false;
    this.form = this.fb.group({
      docsArray: this.fb.array([], [Validators.required])
    });
    this.selectedArray = [];
    this.selectedData = [];
  }

  private resetData() {
    this.selectedArray = [];
    this.recomendedDocs = [];
    this.isVisible = false;
  }

  loadComponent(params: any) {
    // this.isVisible = false;
    this.sppServices.getRSC(params).subscribe(
      res => {
        this.spinner.hide();
        this.recomendedDocs = res;
        // console.log(res)
      },
      error => {
        this.spinner.hide();
        console.log(error)
      }
    )
  }

  validateFilterData() {
    return (this.data.role && this.data.stage && this.data.category) && !this.isVisible;
  }

  onCheckboxChange(e) {
    const docsArray: FormArray = this.form.get('docsArray') as FormArray;

    if (e.target.checked) {
      docsArray.push(new FormControl(e.target.value));
      this.selectedData.push(this.recomendedDocs.find(doc => e.target.value == doc.id))
    } else {
      let i: number = 0;
      docsArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
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

  private hasNull(obj) {
    for (var key in obj) {
      if (obj[key] === null || obj[key] == "")
        return false;
    }
    return true;
  }
}