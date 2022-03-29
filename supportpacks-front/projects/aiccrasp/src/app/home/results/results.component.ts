import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faBookmark, faClock, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { DataListService } from 'projects/libs/sp-datalist/src/public-api';
import { AiccraToolsService } from '../../services/aiccra-tools.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  animations: [trigger('slideInOut', [
    state('in', style({
      overflow: 'hidden',
      height: '*',
      width: '*'
    })),
    state('out', style({
      opacity: '0',
      overflow: 'hidden',
      height: '0px',
      width: '0px'
    })),
    transition('in => out', animate('400ms ease-in-out')),
    transition('out => in', animate('400ms ease-in-out'))
  ]),
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
export class ResultsComponent implements OnInit {
  tcAICCRA = 'To continue downloading your files, please first fill in your email and then some basic information.This information will be used by AICCRA solely for impact assessment and CGIAR and Center level reporting purposes.Filling it in will greatly help us to track the use of the portal and keep improving it. This portal provides data to a very large community of users and improving its usability and efficiency is a key aspect we work on continuously. However, you may click on <a class="skip 2" (click)="onSetEmail()">Skip</a> to download links directly.';

  faUserCircle = faUserCircle;
  faClock = faClock;
  faBookmark = faBookmark;

  @Input() toolFound;
  @Input() filters;
  @Input() filtersIds;

  recommendedTools = [];
  selectedTools = [];
  selectedArray = [];
  form: FormGroup;
  tcIsVisible = false;
  showSelectedTools: boolean = false;



  foundByName = false;

  constructor(private aiccraToolsService: AiccraToolsService, private fb: FormBuilder) { }

  ngOnInit() {
  }

  ngOnChanges(changes: { [property: string]: SimpleChange }) {
    // Extract changes to the input property by its name
    this.form = this.fb.group({
      toolsArray: this.fb.array([], [Validators.required])
    });
    for (const propName in changes) {
      const changedProp = changes[propName];
      if (this.aiccraToolsService.hasNull(changedProp.currentValue) && propName == 'filtersIds') {
        // this.spinner.show()
        console.log(changedProp);

        this.loadComponent(changedProp.currentValue)
      } else if (propName == 'toolFound') {
        // this.resetData();
        console.log({ changedProp });
        this.loadTool(changedProp.currentValue)
      } else {
        // this.resetData();
      }
    }
  }

  loadComponent(params: any) {
    // this.isVisible = false;
    this.recommendedTools = []
    this.aiccraToolsService.getRSC(params).subscribe(
      res => {
        // this.spinner.hide();
        console.log(res);

        this.recommendedTools = res;
        this.selectedTools = [];
        this.showSelectedTools = false;
        this.foundByName = false;

        // console.log('res', this.recomendedDocs)
      },
      error => {
        // this.spinner.hide();
        console.error(error)
      }
    )
  }

  loadTool(tool) {
    this.recommendedTools = [];
    this.recommendedTools.push(tool);
    this.selectedTools = [];
    this.showSelectedTools = false;
    this.foundByName = true;
  }

  validateFilterData() {
    if (this.filters) {
      return this.filters.role !== null && this.filters.stage !== null && this.filters.category !== null;
    }
    return false;
  }

  onCheckboxChange(e) {
    const toolsArray: FormArray = this.form.get('toolsArray') as FormArray;
    console.log(toolsArray);

    if (e.target.checked) {
      toolsArray.push(new FormControl(e.target.value));
      this.selectedTools.push(this.recommendedTools.find(doc => e.target.value == doc.id))
    } else {
      let i: number = 0;
      toolsArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          toolsArray.removeAt(i);
          this.selectedTools.splice(i, 1);
          return;
        }
        i++;
      });
    }
  }

  goToSelectedTools() {
    console.log(this.selectedTools);
    this.selectedArray = this.form.value['docsArray'];

    this.showSelectedTools = true;
    this.tcIsVisible = true;
    console.log(this.tcIsVisible);

  }

  backToResults(ev?) {
    this.selectedTools = [];
    this.showSelectedTools = false;
    this.hideTC();
  }

  hideTC(ev?) {
    this.tcIsVisible = false;
  }

}
