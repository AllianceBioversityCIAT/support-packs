import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from 'projects/melsp/src/app/_helpers/jwt.interceptor';
import { ErrorInterceptor } from 'projects/melsp/src/app/_helpers/error.interceptor';
import { AiccraToolsService } from './services/aiccra-tools.service';
import { DataListModule } from 'projects/libs/sp-datalist/src/public-api';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DataListModule.forRoot(environment),
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
