import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dmsp',
  templateUrl: './dmsp.component.html',
  styleUrls: ['./dmsp.component.scss']
})
export class DmspComponent implements OnInit{

  items:any;
  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
          label: 'Home',
          icon: 'pi pi-fw pi-home',
          url : 'dmsp/home'
          
      },
      {
          label: 'Overview',
          icon: 'pi pi-fw pi-file',
          url: 'dmsp/overview'
         
      },
      {
          label: 'Login',
          icon: 'pi pi-fw pi-user',
          
      }
  ];
  }
}
