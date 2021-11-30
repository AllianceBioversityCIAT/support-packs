import { Component, OnInit } from '@angular/core';
import { faBookmark, faClock, faUserCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  faUserCircle = faUserCircle;
  faClock = faClock;
  faBookmark = faBookmark;
  constructor() { }

  ngOnInit() {
  }

}
