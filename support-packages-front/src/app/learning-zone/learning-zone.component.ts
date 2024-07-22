import { Component, OnInit } from '@angular/core';
import { IBDGoogleAnalytics } from 'ibdevkit';
import { environment } from '../../environments/environment';
import { RouterOutlet } from '@angular/router';
import { SideMenuComponent } from './components/side-menu/side-menu.component';

@Component({
  selector: 'app-learning-zone',
  templateUrl: './learning-zone.component.html',
  styleUrls: ['./learning-zone.component.scss'],
  standalone: true,
  imports: [SideMenuComponent, RouterOutlet],
})
export class LearningZoneComponent implements OnInit {
  ngOnInit() {
    IBDGoogleAnalytics().initialize(environment.GAIDLearningZone);
    localStorage.removeItem('token');
  }
}
