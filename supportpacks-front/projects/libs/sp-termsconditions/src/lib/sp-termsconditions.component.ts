import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as JSZip from 'jszip';
import { NgxSpinnerService } from 'ngx-spinner';
import { SPTermsconditionsService } from './sp-termsconditions.service';
import { FileSaver } from 'FileSaver';
// import * as JSZip from 'jszip';
// import { file } from 'jszip';

@Component({
  selector: 'tc-module',
  templateUrl: './sp-termsconditions.component.html',
  styles: [],
  styleUrls: ['./sp-termsconditions.component.scss'],
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


export class SPTermsconditionsComponent implements OnInit {
  [x: string]: any;

  @Input() tcText: any;
  @Input() docsArray: any;
  @Input() selectedGuidiline: any;
  @Input() app_id: any;
  @Output() goBack = new EventEmitter<boolean>();
  isVisible = false;

  step3 = true;
  step4 = false;
  step5 = false;
  error = false;

  regions = [];

  emailForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required])
  });

  tc_Form;
  selectedUser = {};
  selectedFile = {
    name: null,
    source: null
  };
  // selectGuidelines = {
  //   na
  // }
  filePath = null;

  constructor(private tcService: SPTermsconditionsService, private spinner: NgxSpinnerService, private modalService: NgbModal, private _sanitizer: DomSanitizer) {
    console.log('T&C Component');

  }

  ngOnInit() {

    this.filePath = this.tcService.getFilesPath();
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
    this.isVisible = true;
  }

  onSetEmail() {
    if (!this.emailForm.invalid && !this.step5) {
      this.spinner.show();
      this.tcService.getPersonInfo({ email: this.emailForm.value['email'] })
        .subscribe(
          res => {
            // console.log(res);
            this.selectedUser = res[0];
            if (res.length > 0) {
              this.tc_Form = new FormGroup({
                first_name: new FormControl(this.selectedUser['first_name'], [Validators.required]),
                last_name: new FormControl(this.selectedUser['last_name'], [Validators.required]),
                institute_name: new FormControl(this.selectedUser['institute'], [Validators.required]),
                research_regions: new FormArray([], [Validators.required]),
                institute_regions: new FormArray([], [Validators.required]),
                use: new FormControl('', [Validators.required]),
              });
              // this.tc_Form.setValue({first_name: this.selectedUser['first_name'], last_name: this.selectedUser['last_name'], institute: this.selectedUser['institute']})

            } else {
              this.tc_Form = new FormGroup({
                first_name: new FormControl('', [Validators.required]),
                last_name: new FormControl('', [Validators.required]),
                institute_name: new FormControl('', [Validators.required]),
                research_regions: new FormArray([], [Validators.required]),
                institute_regions: new FormArray([], [Validators.required]),
                use: new FormControl('', [Validators.required]),
              });

            }
            this.step3 = false;
            this.step4 = true;
            this.spinner.hide()
            //this.step5 = false;
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
      params['app_id']  = this.app_id; 
      params['user_id'] = this.selectedUser ? this.selectedUser['id'] : undefined;
      params['email'] = this.selectedUser ? this.selectedUser['email'] : this.emailForm.value['email'];
      params['guide_selected'] = this.selectedGuidiline.map(g => g.id);
      console.log(params)
      this.tcService.setDownload(params)
        .subscribe(
          res => {
            this.spinner.hide();
            // console.log('onSetTC', res);
          },
          error => {
            this.step5 = true;
            this.spinner.hide();
            this.error = error.statusText
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


  safeURL(url) {
    url = url.replace("watch?v=", "embed/");
    if (!this.isYoutube(url))
      url = this.filePath + url;

    return url;
    // return this._sanitizer.bypassSecurityTrustResourceUrl(url) ;
  }
  openFile(file, content) {
    this.selectedFile = file;
    this.open(content)
  }

  /*******************************************************Download steps*******************************************************/
  downloadAll() {
    this.printGuidelinesToDownload();
  // This is the function where I get the access links of all the uploaded files, which can weigh more than 11GB in total.
  // But here I only get an array of links
  // const prefix = 'https://cgiar.sharepoint.com/:f:/s/CCAFS-KDS/EsgrIFazoKZIsmTBARLd5DEBk1KAw8E4ixTJ7z5C8dLhXA?e=GTzBRs'
  const url = this.selectedGuidiline.map(u => u.source);
  console.log(url);
  // const urls = this.PROJECT.resources.map(u => u.link); 
  this.tcService.downloadAll(url, this.downloadCallback); // my download service
}


// this is my callback function that I send to the service
downloadCallback(metaData) {
  const percent = metaData.percent;
  setTimeout(() => {
    console.log(percent);
    if (percent >= 100) { 
      console.log('Zip Downloaded'); 
    }
  }, 10);
}

  downloadFiles() {
    // let zip = new JSZip();
    // zip.file("readme.txt", "Files required");
    // let txtFile = zip.folder("txt");
    // this.selectedItems?.forEach((items) => {
    //   this.downloadService.downloadFile(items.name)
    //     .subscribe((response) => {
    //       let base64 = response.output.split(",");
    //       txtFile.file(items.name, base64[1], { base64: true });
    //       zip.generateAsync({ type: "blob" })
    //         .then((content) => {
    //           // see FileSaver.js
    //           FileSaver.saveAs(content, this.fileZipName);
    //         });
    //     });
    // });


    // let zip = new JSZip();
    // zip.file("readme.txt", "Files required");
    // let txtFile = zip.folder("txt");
    // this.selectedItems?.forEach((this.selectedFile.name) => {
    //   this.downloadService
    //     .downloadFile(this.selectedFile.name)
    //     .subscribe((response) => {
    //       let base64 = response.output.split(",");
    //       txtFile.file(this.selectedFile.name, base64[1], { base64: true });
    //     });
    // });
    // zip.generateAsync({ type: "blob" })
    //   .then((content) => {
    //     // see FileSaver.js
    //     FileSaver.saveAs(content, this.fileZipName);
    //   });
  }


  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      window.open(result, "_blank");
      this.selectedFile = {
        name: null,
        source: null
      };
    }, (reason) => {
      this.selectedFile = {
        name: null,
        source: null
      };
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
  isYoutube(url) {
    let p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    return (url.match(p)) ? '1' : '0';
  }
}

function zipFiles() {
  
}
/*****************FUNCTIONS*******************/
const filesToZip = []

