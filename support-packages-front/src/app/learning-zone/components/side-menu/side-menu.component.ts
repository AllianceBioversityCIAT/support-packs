import { Component, OnInit } from '@angular/core';
import { ServicesLearningZoneService } from '../../services/services-learning-zone.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit{
  sales:any[] = [];
  rojo = "red";
  loading = true;
  constructor(private _servicesLearningZoneService:ServicesLearningZoneService) { }

  ngOnInit(): void {
    this. getInformation();
  }
  visible: boolean = false;
  showDialog() {
    this.visible = true;
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
}
