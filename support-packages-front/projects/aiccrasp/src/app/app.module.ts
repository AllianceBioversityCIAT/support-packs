import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InputTextModule } from 'primeng/inputtext';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    InputTextModule,
    AppRoutingModule,
    BrowserAnimationsModule ,
    RouterModule.forRoot([]),
    HttpClientModule,
    ReactiveFormsModule      
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
