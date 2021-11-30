import { Component, OnInit } from '@angular/core';
import { faUserCircle, faClock, faBookmark } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  roles = [
    {name: 'Program Manager'},
    {name: 'Project Manager'},
    {name: 'M&E Officer'},
  ]
  selectedRole;

  faUserCircle = faUserCircle;
  faClock = faClock;
  faBookmark = faBookmark;
  constructor() { }

  ngOnInit() {
  }

  selectFilter(type: string, data: any) {
    // this.filterData[type] = data.name;
    // this.filterDataId[type] = data.id;
    // this.filterDataId = Object.assign({}, this.filterDataId);
    // this.filterData = Object.assign({}, this.filterData);
    // console.log(this.filterData)
  }


}
