import { Component, OnInit } from '@angular/core';
import { IBDGoogleAnalytics } from 'ibdevkit';
import { environment } from '../../environments/environment';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-dmsp',
    templateUrl: './dmsp.component.html',
    styleUrls: ['./dmsp.component.scss'],
    standalone: true,
    imports: [RouterOutlet],
})
export class DmspComponent implements OnInit {
  ngOnInit() {
    IBDGoogleAnalytics().initialize(environment.GAIDDMSP);
  }
}
