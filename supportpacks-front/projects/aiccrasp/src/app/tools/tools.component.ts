import { Component, OnInit, PipeTransform } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AiccraToolsService } from '../services/aiccra-tools.service';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {


  filter = new FormControl('');
  guidelines$: Observable<any[]>;
  allGuides = [];
  roles = [];
  stages = [];
  importanceLevels = [
    { name: 'Very important', value: 4 },
    { name: 'Important', value: 3 },
    { name: 'Useful', value: 2 },
    { name: 'Optional', value: 1 },
  ];

  // currentUser: User;

  constructor(private fb: FormBuilder, private aiccraService: AiccraToolsService, private router: Router, private spinner: NgxSpinnerService) {
    this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.init();
      }
    });
  }

  ngOnInit() {
  }
  init() {
    this.spinner.show();
    // this.currentUser = this.authenticationService.currentUserValue;
    this.getAllGuidelines();
    this.getPhases();
    this.getUsers();
  }

  activeGuide(guide) {
    guide.active = !guide.active;
    // console.log(guide)
  }

  parseRolByStage(guide: any, role: any, stage: any) {
    if (guide.stages[stage.name]) {
      return guide.stages[stage.name].find(r => r.role == role.name).importance_level
    } else {
      return 1
    }
  }

  getGuideRolByStage(guide: any, role: string, stage: string) {
    if (Object.keys(guide.stages).length !== 0 && guide.stages.constructor === Object) {
      let gStage = guide.stages[stage];
      // console.log(guide, stage)
      let impLvl = gStage.find(stg => stg.role == role).importance_level;
      return impLvl;
    }
    return 1
  }


  getAllGuidelines() {
    this.spinner.show();
    // let id = this.currentUser ? this.currentUser.user.id : undefined
    this.aiccraService.getAllGuidelines()
      .subscribe(
        res => {
          // console.log(res);
          this.allGuides = res;
          this.guidelines$ = this.filter.valueChanges.pipe(
            startWith(''),
            map((text:string) => this.search(text))
          );
          this.spinner.hide()

        },
        error => {
          this.spinner.hide()
          console.error(error)
        }
      )
  }

  getUsers() {
    this.aiccraService.getSPUsers()
      .subscribe(
        res => {
          // console.log(res);
          this.roles = res;
        },
        error => {
          console.error(error)
        }
      )
  }
  getPhases() {
    this.aiccraService.getSPPhases()
      .subscribe(
        res => {
          // console.log(res);
          this.stages = res;
        },
        error => {
          console.error(error)
        }
      )
  }

  search(text: string, pipe?: PipeTransform): any[] {
    return this.allGuides.filter(guide => {
      const term = text.toLowerCase();
      return guide.name.toLowerCase().includes(term)
        || guide.id == parseInt(term)
      // || pipe.transform(country.population).includes(term);
    });
  }


  updateImportance(guide: any, role: any, stage: any, implvl: any) {
    if (guide.stages[stage.name]) {
      let iL = guide.stages[stage.name].find(r => r.role == role.name);
      iL.importance_level = implvl.value;
      console.log(iL)
      this.aiccraService.updateImportanceLevel({ id: iL.id, importanceL: iL })
        .subscribe(
          res => {
            console.log(res);
            this.stages = res;
          },
          error => {
            console.error(error)
          }
        )
    }
  }

}
