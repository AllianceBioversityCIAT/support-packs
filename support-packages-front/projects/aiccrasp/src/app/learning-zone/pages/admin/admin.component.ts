import { Component } from '@angular/core';
import { ServicesLearningZoneService } from '../../services/services-learning-zone.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  products: any[] = [];
  selectedProducts: any[] = [];
  loading: boolean = false;
  constructor(private _servicesLearningZoneService:ServicesLearningZoneService){}
  ngOnInit() {
    this.getAllRequest();
}
  getAllRequest(){
    this._servicesLearningZoneService.getAllRequest().subscribe((data)=>{
      console.log(data);
      
      this.products = data.result;
    })
  }
}
