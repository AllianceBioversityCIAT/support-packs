import { Component } from '@angular/core';
import { environment } from '../environments/environment.prod';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  googleAnalyticsId = environment.googleAnalyticsId;
  title = 'aiccrasp';
}
