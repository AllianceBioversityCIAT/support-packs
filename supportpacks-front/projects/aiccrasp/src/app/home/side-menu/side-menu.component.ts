import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faUserCircle, faClock, faBookmark } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  roles = [
    { name: 'Program Manager' },
    { name: 'Project Manager' },
    { name: 'M&E Officer' },
  ]

  filterData = {
    user: null,
    phase: null,
    area: null,
  }

  users: any[] = ["Researcher", "Technical staff (public/private)", "Academia"]
  phases: any[] = ["Design", "Implementation", "Monitoring and Evaluation"]
  areas: any[] = [
    "Calculators / Mitigation options",
    " Climate information services",
    " Climate risk assessment",
    " Climate - smart business models",
    " Gender",
    " Monitoring reporting and verification",
    " Program support",
    " Prioritisation",
    " Scaling",
    " Science - policy platform",
    " Situation analysis",
    " Targeting / Need assessment"
  ];

  selectedRole;

  faUserCircle = faUserCircle;
  faClock = faClock;
  faBookmark = faBookmark;

  @Output() filtersEmitter:EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  selectFilter(type: string, data: any) {
    this.filterData[type] = data;
    // this.filterDataId[type] = data.id;
    // this.filterDataId = Object.assign({}, this.filterDataId);
    this.filterData = Object.assign({}, this.filterData);
    this.filtersEmitter.emit(this.filterData);
    console.log(this.filterData)
  }


}
