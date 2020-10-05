import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { error } from 'protractor';
import { TermsconditionsService } from './termsconditions.service';

@Component({
  selector: 'tc-module',
  templateUrl: './termsconditions.component.html',
  styles: [],
  styleUrls: ['./termsconditions.component.scss'],
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
export class TermsconditionsComponent implements OnInit {

  @Input() docsArray: any;
  @Input() selectedGuidiline: any;
  @Output() goBack = new EventEmitter<boolean>();
  isVisible = false;

  step3 = true;
  step4 = false;
  step5 = false;

  regions = []

  emailForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required])
  });

  tc_Form;
  selectedUser = {};

  constructor(private tcService: TermsconditionsService, private spinner: NgxSpinnerService, private modalService: NgbModal) { }

  ngOnInit() {
    // console.log(this.selectedGuidiline)
    this.getRegions();
  }

  ngOnChanges(changes: { [property: string]: SimpleChange }) {
    // Extract changes to the input property by its name
    const log: string[] = [];
    for (const propName in changes) {
      const changedProp = changes[propName];
      // console.log(changedProp.currentValue.length)
      if (changedProp.currentValue.length > 0) {
        this.isVisible = true;
      } else {
        // console.log(changedProp, propName);
        this.isVisible = false;
      }
    }
  }

  goBackBtn() {
    this.goBack.emit(true);
  }

  onSetEmail() {
    if (!this.emailForm.invalid && !this.step5) {
      this.spinner.show();
      this.tcService.getPersonInfo({ email: this.emailForm.value['email'] })
        .subscribe(
          res => {
            // console.log(res);
            this.selectedUser = res[0];
            this.tc_Form = new FormGroup({
              first_name: new FormControl(this.selectedUser['first_name'], [Validators.required]),
              last_name: new FormControl(this.selectedUser['last_name'], [Validators.required]),
              institute_name: new FormControl(this.selectedUser['institute'], [Validators.required]),
              research_regions: new FormArray([], [Validators.required]),
              institute_regions: new FormArray([], [Validators.required]),
              use: new FormControl('', [Validators.required]),
            });
            // this.tc_Form.setValue({first_name: this.selectedUser['first_name'], last_name: this.selectedUser['last_name'], institute: this.selectedUser['institute']})
            this.step3 = false;
            this.step4 = true;
            this.spinner.hide()
            // this.step5 = false;
          },
          error => {
            this.spinner.hide()
            console.error(error)
          }
        )
    } else {
      this.step5 = true;
      this.step3 = false;
    }
  }

  onSetTC() {
    // console.log(this.tc_Form.value)
    if (!this.tc_Form.invalid) {
      this.spinner.show();
      this.step4 = false
      let params = this.tc_Form.value;
      params['user_id'] = this.selectedUser ? this.selectedUser['id'] : undefined;
      params['guide_selected'] = this.selectedGuidiline.map(g => g.id);
      this.tcService.setDownload(this.tc_Form.value)
        .subscribe(
          res => {
            this.spinner.hide();
            // console.log(res);
          },
          error => {
            this.step5 = false;
            this.spinner.hide();
            console.error(error)
          }
        )
    }
  }

  onCheckboxChange(e, arrayName: string) {
    const array: FormArray = this.tc_Form.get(arrayName) as FormArray;

    if (e.target.checked) {
      array.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      array.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          array.removeAt(i);
          return;
        }
        i++;
      });
    }
  }


  downloadFiles() { }
  openFile(file, content) {
    console.log(file, content)
    // this.open(content)
  }

  open(content) {
    let closeResult;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      closeResult = `Closed with: ${result}`;
      console.log(closeResult)
    }, (reason) => {
      console.log(closeResult)
      closeResult = `Dismissed ${reason}`;
    });
  }

  /**
   * 
   */

  getRegions() {
    this.tcService.getRegions().
      subscribe(
        res => {
          this.regions = res;
          // console.log(res)
        },
        error => { console.error(error) }
      )
  }
}
