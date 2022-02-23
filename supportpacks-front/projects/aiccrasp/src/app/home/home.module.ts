import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { ResultsComponent } from './results/results.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [HomeComponent, SideMenuComponent, ResultsComponent, TermsConditionsComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgbModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class HomeModule { }
