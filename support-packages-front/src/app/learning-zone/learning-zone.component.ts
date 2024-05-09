import { Component, OnInit } from '@angular/core';
import { IBDGoogleAnalytics } from 'ibdevkit';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-learning-zone',
  templateUrl: './learning-zone.component.html',
  styleUrls: ['./learning-zone.component.scss'],
})
export class LearningZoneComponent implements OnInit {
  ngOnInit() {
    IBDGoogleAnalytics().initialize(environment.GAIDLearningZone);
  }
}
