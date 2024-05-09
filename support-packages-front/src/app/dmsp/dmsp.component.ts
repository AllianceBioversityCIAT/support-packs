import { Component, OnInit } from '@angular/core';
import { IBDGoogleAnalytics } from 'ibdevkit';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-dmsp',
  templateUrl: './dmsp.component.html',
  styleUrls: ['./dmsp.component.scss'],
})
export class DmspComponent implements OnInit {
  ngOnInit() {
    IBDGoogleAnalytics().initialize(environment.GAIDDMSP);
  }
}
