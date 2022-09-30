import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { SPTermsconditionsModule } from 'projects/libs/sp-termsconditions/src/public-api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { GoogleAnalyticsComponent } from 'projects/libs/google-analytics/google-analytics.component';
import { environment } from '../environments/environment.prod';

@NgModule({
  declarations: [AppComponent, GoogleAnalyticsComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SPTermsconditionsModule.forRoot(environment),
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
