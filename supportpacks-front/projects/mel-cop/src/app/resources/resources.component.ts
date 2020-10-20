import { Component, OnInit, PipeTransform } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { SppServices } from '../services/spp-services.service';

// import { faChevronLeft, faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';
import { AuthService, User } from '../services/auth.service';
import { NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})

export class ResourcesComponent implements OnInit {

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

  currentUser: User;

  constructor(private fb: FormBuilder, private sppServices: SppServices, private router: Router, private spinner: NgxSpinnerService, private authenticationService: AuthService) {
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
    this.currentUser = this.authenticationService.currentUserValue;
    this.getAllGuidelines();
    this.getStages();
    this.getRoles();
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
      let impLvl = gStage.find(stg => stg.role == role).importance_level;
      return impLvl;
    }
    return 1
  }


  getAllGuidelines() {
    this.spinner.show();
    let id = this.currentUser ? this.currentUser.user.id : undefined
    this.sppServices.getAllGuidelines(id)
      .subscribe(
        res => {
          // console.log(res);
          this.allGuides = res;
          this.guidelines$ = this.filter.valueChanges.pipe(
            startWith(''),
            map(text => this.search(text))
          );
          this.spinner.hide()

        },
        error => {
          this.spinner.hide()
          console.error(error)
        }
      )
  }

  getRoles() {
    this.sppServices.getSPRoles()
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
  getStages() {
    this.sppServices.getSPStages()
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

}
