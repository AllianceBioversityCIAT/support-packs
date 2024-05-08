import { Component, OnInit } from '@angular/core';
import { ServicesLearningZoneService } from 'src/app/learning-zone/services/services-learning-zone.service';

@Component({
  selector: 'app-tool-inactive',
  templateUrl: './tool-inactive.component.html',
  styleUrls: ['./tool-inactive.component.scss'],
})
export class ToolInactiveComponent implements OnInit {
  archivedToolsData: any[] = [];
  loading: boolean = false;
  confirmDesactive: boolean = false;
  informationEdit: any = null;
  loadingSave: boolean = false;

  constructor(private _servicesLearningZoneService: ServicesLearningZoneService) {}

  ngOnInit(): void {
    this.getAllTools();
  }

  showDialogDesactive(customer: any) {
    this.confirmDesactive = true;
    this.informationEdit = customer;
  }

  desactive() {
    this.loadingSave = true;
    this._servicesLearningZoneService
      .activeOrDesactive(this.informationEdit, 1)
      .subscribe((data) => {
        this.getAllTools();
        this.confirmDesactive = false;
        this.loadingSave = false;
      });
  }

  getAllTools() {
    this.loading = true;
    this._servicesLearningZoneService.getToolsAdminDesactive().subscribe((data) => {
      this.archivedToolsData = data.result;
      this.loading = false;
    });
  }
}
