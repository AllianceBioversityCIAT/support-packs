import { Component, EventEmitter, OnInit, Output, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';
import { faUserCircle, faClock, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { AiccraToolsService } from '../../services/aiccra-tools.service';


@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {


  filterData = {
    role: null,
    stage: null,
    category: null
  }
  filterDataIds = {
    role: null,
    stage: null,
    category: null
  }

  roles: any[] = []
  stages: any[] = []
  categories: any[] = [];

  selectedRole;

  faUserCircle = faUserCircle;
  faClock = faClock;
  faBookmark = faBookmark;

  @Output() filtersEmitter:EventEmitter<any> = new EventEmitter();
  @Output() filtersIdsEmitter:EventEmitter<any> = new EventEmitter();

  constructor(private aiccraService: AiccraToolsService, private router: Router) { }

  ngOnInit() {
    this.getFilters();
  }

  getFilters() {
    Promise.all([this.aiccraService.getSPUsers().toPromise(), this.aiccraService.getSPAreas().toPromise(), this.aiccraService.getSPPhases().toPromise()])
      .then(([users, areas, phases]) => {
        this.roles = users;
        this.categories = areas;
        this.stages = phases;
        // this.spinner.hide()
      })
      .catch(error => 
        // this.spinner.hide()
        console.log(error)
        
        );

  }

  resetData() {
    // this.selectedArray = [];
    // this.recomendedDocs = [];
    // this.isVisible = false;
  }
  
  resetFilters(type: string, data: any) {
    this.filterData = {
      role: null,
      stage: null,
      category: null
    }
    this.filterDataIds = {
      role: null,
      stage: null,
      category: null
    }
    
    this.filtersEmitter.emit(this.filterData);
    this.filtersIdsEmitter.emit(this.filterDataIds);

    console.log(this.filterData)
  }
  selectFilter(type: string, data: any) {
    this.filterData[type] = data.name;
    this.filterDataIds[type] = data.id;

    this.filterData = Object.assign({}, this.filterData);
    this.filterDataIds = Object.assign({}, this.filterDataIds);
    
    this.filtersEmitter.emit(this.filterData);
    this.filtersIdsEmitter.emit(this.filterDataIds);

    console.log(this.filterData)
  }

  goToOverview(){
    console.log('goToOverview');
    
    this.router.navigate(['/aiccrasp/overview']);
  }

}
