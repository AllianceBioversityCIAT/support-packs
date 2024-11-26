import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { IBDGoogleAnalytics } from 'ibdevkit';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-melsp',
  templateUrl: './melsp.component.html',
  styleUrls: ['./melsp.component.scss'],
  standalone: true,
  imports: [RouterOutlet],
})
export class MelspComponent implements OnInit {
  ngOnInit(): void {
    IBDGoogleAnalytics().initialize(environment.GAIDMELSP);
  }
}
