import { Component, EventEmitter, OnInit, Output, PipeTransform, SimpleChange } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { faUserCircle, faClock, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
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

  searchFilter = new FormControl('');
  tools$: Observable<any[]>;
  allTools = [];

  @Output() filtersEmitter:EventEmitter<any> = new EventEmitter();
  @Output() filtersIdsEmitter:EventEmitter<any> = new EventEmitter();
  @Output() toolFoundedEmitter:EventEmitter<any> = new EventEmitter();

  constructor(private aiccraService: AiccraToolsService, private router: Router) { }

  ngOnInit() {
    this.getFilters();
    this.getAllTools();
    
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

  getAllTools() {
    // this.spinner.show();
    // let id = this.currentUser ? this.currentUser.user.id : undefined
    this.aiccraService.getAllGuidelines()
      .subscribe(
        res => {
          this.allTools = res;
          console.log(res);
          this.tools$ = this.searchFilter.valueChanges.pipe(
            startWith(''),
            map((text:string) => this.search(text))
          );
          // this.spinner.hide()

        },
        error => {
          // this.spinner.hide()
          console.error(error)
        }
      )
  }

  search(text: string, pipe?: PipeTransform): any[] {
    return this.allTools.filter(tool => {
      const term = text.toLowerCase();
      return tool.name.toLowerCase().includes(term)
        || tool.id == parseInt(term)
      // || pipe.transform(country.population).includes(term);
    });
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

  findTool(e, tool) {
    this.toolFoundedEmitter.emit(tool);
    console.log(tool);
    
  }

}
