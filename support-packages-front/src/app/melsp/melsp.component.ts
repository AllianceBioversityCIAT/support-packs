import { Component, OnInit } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { environment } from '../../environments/environment';
import { IBDGoogleAnalytics } from 'ibdevkit';

@Component({
  selector: 'app-melsp',
  templateUrl: './melsp.component.html',
  styleUrls: ['./melsp.component.scss'],
})
export class MelspComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit(): void {
    IBDGoogleAnalytics().initialize(environment.GAIDMELSP);

    this.items = [
      {
        label: 'Home',
        icon: PrimeIcons.HOME,
        routerLink: ['/melsp/home'],
        routerLinkActiveOptions: {
          exact: true,
        },
      },
      {
        label: 'All resources',
        icon: PrimeIcons.LIST,
        routerLink: ['/melsp/overview'],
        routerLinkActiveOptions: {
          exact: true,
        },
      },
      {
        label: 'Request to upload a resource',
        icon: PrimeIcons.SEND,
        url: 'https://docs.google.com/forms/d/e/1FAIpQLScc1mMjjOyzQs8Co8tpg_RsorG7KKLlvLfU3ax54G_z2b-poA/viewform',
      },
    ];
  }
}
