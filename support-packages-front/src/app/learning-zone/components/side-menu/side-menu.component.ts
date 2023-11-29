import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ServicesLearningZoneService } from '../../services/services-learning-zone.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit{
  sales:any[] = [];
  rojo = "red";
  loading = true;
  menu = [
    {
      name: "AICCRA Learning Zone",
      selected: false
    },
    {
      name: "AICCRA Learning Zone",
      selected: false
    },
    {
      name: "AICCRA Learning Zone",
      selected: false
    },
    {
      name: "AI",
      selected: false
    }
  ]
  constructor(private _servicesLearningZoneService:ServicesLearningZoneService, private router : Router) { }

  ngOnInit(): void {
    this. getInformation();
    console.log(this.router.url);
    
    if(this.router.url === '/aiccra/manage-tool'){
      this.menu[3].selected = true;
    }
    if (this.router.url === '/aiccra/learning-zone') {
      this.menu[0].selected = true;
      
    }
    if (this.router.url === '/aiccra/FAQ') {
      this.menu[2].selected = true;
      
    }

  }
  visible: boolean = false;
  showDialog() {
    this.visible = true;
}
ngOnChanges(changes: SimpleChanges) {
  console.log(changes);
  
  // changes.prop contains the old and the new value...
}

getInformation(){
  this._servicesLearningZoneService.getToolOverview().subscribe((data)=>{
    console.log(data);
    this.sales = data.result;
    this.loading = false;
  });
}

getImportants(acronym:string, propolsal:string, data:any, id:any){
 let important = 0; 
 let styleColor = "";
  let data2 = data.filter((data:any)=>{
    return data.acronym == acronym && data.name == propolsal ;
  });
  if (data2.length > 0) {
    
    if (data2[0].importance_level === "Very important") {
      important = 4;
      styleColor = 'veryImportant'
  }
  if (data2[0].importance_level === "Important") {
    important =  3
    styleColor = 'important'
  }
  if (data2[0].importance_level == "Useful") {
    important =  2
    styleColor = 'useful'
  }
  if (data2[0].importance_level == "Optional") {
    important =  1
    styleColor = 'optional'
  }
  }
  

  return {important, styleColor};
    
    
  
}

onClicked(number){
  this.menu.map((data:any)=>{
    data.selected = false;
  });
  this.menu[number].selected = true;
}
}
