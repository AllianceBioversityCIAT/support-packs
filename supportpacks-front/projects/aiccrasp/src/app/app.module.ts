import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from 'projects/melsp/src/app/_helpers/jwt.interceptor';
import { ErrorInterceptor } from 'projects/melsp/src/app/_helpers/error.interceptor';
import { AiccraToolsService } from './services/aiccra-tools.service';


import { SPTermsconditionsModule } from 'projects/libs/sp-termsconditions/src/public-api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SPTermsconditionsModule.forRoot(environment),
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule 
  ],
  exports: [
    
  ],
  providers: [

  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
