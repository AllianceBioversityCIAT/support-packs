import { Component, OnInit } from '@angular/core';
import { ServicesLearningZoneService } from 'src/app/learning-zone/services/services-learning-zone.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit{
  sales:any[] = [];

  constructor(private _servicesLearningZoneService:ServicesLearningZoneService) { }

  ngOnInit(): void {

  }

  getInformation(){
    this._servicesLearningZoneService.getToolOverview().subscribe((data)=>{
      console.log(data);
      this.sales = data.result;
    })
  }

}
