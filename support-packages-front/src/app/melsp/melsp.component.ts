import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-melsp',
  templateUrl: './melsp.component.html',
  styleUrls: ['./melsp.component.scss']
})
export class MelspComponent implements OnInit{

  items:any;
  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
          label: 'Home',
          icon: 'pi pi-fw pi-home',
          url : ''
          
      },
      {
          label: 'Overview',
          icon: 'pi pi-fw pi-file',
          url: 'aiccra'
         
      },
      {
          label: 'Login',
          icon: 'pi pi-fw pi-user',
          
      }
  ];
  }
}
