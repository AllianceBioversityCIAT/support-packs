import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { sp-termsconditionsModule } from 'projects/sp-termsconditions/src/public-api';
import { environment } from '../environments/environment';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DataListModule } from 'projects/libs/sp-datalist/src/public-api';
import { GoogleAnalyticsComponent } from 'projects/libs/google-analytics/google-analytics.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GoogleAnalyticsComponent,
    // DataListComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    DataListModule.forRoot(environment),
    // sp-termsconditionsModule.forRoot(environment),
    FontAwesomeModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
