import { Component, Input, OnInit } from '@angular/core';
import { SppServices } from '../services/spp-services.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { trigger, transition, style, animate, query, stagger, state } from '@angular/animations';

import { faList, faPaperPlane, faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService, User } from '../services/auth.service';
import { appendFile } from 'fs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('slideInOut', [
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
    ])
    ,
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
export class HomeComponent implements OnInit {

  
  app_id = "";
  SProles = [];
  roles: any = [];
  categories: any;
  stages: any;
  filterData = {
    category: null,
    stage: null,
    role: null,
  }
  filterDataId = {
    category: null,
    stage: null,
    role: null,
  }
  faList = faList;
  faPaperPlane = faPaperPlane;
  faUserCircle = faUserCircle;
  faSignOutAlt = faSignOutAlt;
  currentUser: User;



  constructor(public sppServices: SppServices, private router: Router, private spinner: NgxSpinnerService, private modalService: NgbModal, private authenticationService: AuthService) {
    this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.init();
      }
    });
  }

  ngOnInit() {
    // if (e instanceof NavigationEnd) {

  }

  init() {
    this.spinner.show()
    this.getFilters();
    this.currentUser = this.authenticationService.currentUserValue;
  }


  getFilters() {
    Promise.all([this.sppServices.getSPRoles().toPromise(), this.sppServices.getSPCategories().toPromise(), this.sppServices.getSPStages().toPromise()])
      .then(([roles, categories, stages]) => {
        this.roles = roles;
        this.categories = categories;
        this.stages = stages;
        this.spinner.hide()
      })
      .catch(error => this.spinner.hide());

  }

  selectFilter(type: string, data: any) {
    this.filterData[type] = data;
    this.filterDataId[type] = data.id;
    this.filterDataId = Object.assign({}, this.filterDataId);
    this.filterData = Object.assign({}, this.filterData);
    // console.log(this.filterData)
  }

  validateFilterData() {
    return this.filterData.role !== null && this.filterData.stage !== null && this.filterData.category !== null;
  
  }

  clearFilter(prop?, val?) {
    if (prop) {
      this.filterData[prop] = val;
      this.filterDataId[prop] = null;
      this.filterDataId = this.filterDataId
    } else {
      this.filterData = {
        category: 'Choose what...',
        stage: 'Choose when...',
        role: 'Choose a Role...',
      }
      this.filterDataId = {
        category: null,
        stage: null,
        role: null,
      }
    }
  }

  onUserLogged(ev) {
    if (ev) {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.modalService.dismissAll();
        this.router.navigate(['home']);
      });
    }
  }


  logOut() {
    this.authenticationService.logout();
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.modalService.dismissAll();
      this.router.navigate(['home']);
    });
  }

  /**
   * 
   * login modal
   */

  open(content) {
    this.modalService.open(content, { centered: true });
  }

  /**
   * 
   * 
   */
  onrData(data: any) {
    this.filterData = data;
  }
}
