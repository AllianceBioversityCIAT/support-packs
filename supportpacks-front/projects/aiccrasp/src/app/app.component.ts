import { Component } from '@angular/core';
import Hotjar from '@hotjar/browser';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'aiccrasp';

  ngOnInit() {
    Hotjar.init(environment.siteId, environment.hotjarVersion);
  }
}
