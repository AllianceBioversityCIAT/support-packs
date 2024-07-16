import { Component, OnInit } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';
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
  items: MenuItem[] | undefined;

  ngOnInit(): void {
    IBDGoogleAnalytics().initialize(environment.GAIDMELSP);

    this.items = [
      {
        label: 'Home',
        icon: PrimeIcons.HOME,
        route: '/melsp/home',
      },
      {
        label: 'All resources',
        icon: PrimeIcons.LIST,
        route: '/melsp/overview',
      },
      {
        label: 'Request to upload a resource',
        icon: PrimeIcons.SEND,
        url: 'https://docs.google.com/forms/d/e/1FAIpQLScc1mMjjOyzQs8Co8tpg_RsorG7KKLlvLfU3ax54G_z2b-poA/viewform',
      },
    ];
  }
}
