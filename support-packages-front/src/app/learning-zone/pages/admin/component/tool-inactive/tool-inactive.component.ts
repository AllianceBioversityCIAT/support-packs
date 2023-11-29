import { Component, OnInit } from '@angular/core';
import { ServicesLearningZoneService } from 'src/app/learning-zone/services/services-learning-zone.service';

@Component({
  selector: 'app-tool-inactive',
  templateUrl: './tool-inactive.component.html',
  styleUrls: ['./tool-inactive.component.scss']
})
export class ToolInactiveComponent implements OnInit{
  customers!: any[];
  loading : boolean = false;
  confirmDesactive: boolean = false;
  informationEdit:any = null ;
  loadingSave : boolean = false;
  thematicAreas :any = []
  constructor(private _servicesLearningZoneService:ServicesLearningZoneService,) { }

  ngOnInit(): void {
    this.getAllTools();
  }

  showDialogDesactive(customer:any){
    this.confirmDesactive = true;
    this.informationEdit = customer;
  }

  desactive(){
    this.loadingSave = true;
    this._servicesLearningZoneService.activeOrDesactive(this.informationEdit, 1).subscribe((data)=>{
      console.log(data);
      this.getAllTools();
      this.confirmDesactive = false;
      this.loadingSave = false;
    });
  }

  getAllTools(){
    this.loading = true
    this.customers = [];
    this._servicesLearningZoneService.getToolsAdminDesactive().subscribe((data)=>{
      this.customers = data.result;
      console.log(data);
      this.loading = false;
    })

    this._servicesLearningZoneService.getSPFilters().subscribe((data)=>{
      console.log(data);

      this.thematicAreas = data.result.categories;
    });
  }

}
