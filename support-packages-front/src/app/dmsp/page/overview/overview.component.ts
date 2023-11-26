import { Component, OnInit } from '@angular/core';
import { ServicedmspService } from '../../services/servicedmsp.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit{
  sales:any[] = [];
  rojo = "red";
  loading = true;
  constructor(private _servicesDmspService:ServicedmspService) { }

  ngOnInit(): void {
    this. getInformation();
  }

  getInformation(){
    this._servicesDmspService.getToolOverview().subscribe((data)=>{
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
