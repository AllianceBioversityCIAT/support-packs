import { Component, Input, OnInit } from '@angular/core';
import { NavigationStart, Router, Event as NavigationEvent } from '@angular/router';
declare let gtag: (property: string, value: any, configs: any) => {};

@Component({
  selector: 'app-google-analytics',
})
export class GoogleAnalyticsComponent implements OnInit {
  @Input() googleAnalyticsId: string;
  constructor(private router: Router) {}

  ngOnInit() {
    console.log('GA');
    try {
      var script = document.createElement('script');
      script.onload = () => {
        // console.log("Script loaded and ready");
      };
      script.src = `https://www.googletagmanager.com/gtag/js?id=${this.googleAnalyticsId}`;
      document.getElementsByTagName('head')[0].appendChild(script);

      var script2 = document.createElement('script');
      script2.type = 'text/javascript';
      script2.text = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
  
      gtag('config', '${this.googleAnalyticsId}');
      `;
      document.getElementsByTagName('head')[0].appendChild(script2);
    } catch (error) {
      console.log(error);
    }

    this.router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationStart) {
        // console.log(event.url.split('/')[2])

        try {
          gtag('config', this.googleAnalyticsId, {
            page_path: event.url,
          });
        } catch (error) {
          console.log(error);
        }
      }
    });
  }
}
