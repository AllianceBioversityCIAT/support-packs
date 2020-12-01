import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SSL_OP_SINGLE_DH_USE } from 'constants';
import { NgxSpinnerModule } from 'ngx-spinner';
import { env } from 'process';
import { SPTermsconditionsModule } from 'projects/sp-termsconditions/src/public-api';
import { DataListComponent } from './data-list.component';


@NgModule({
  declarations: [DataListComponent],
  imports: [
    BrowserModule,
    NgxSpinnerModule,
    HttpClientModule,
    // NgModule,
    ReactiveFormsModule,
    FormsModule,
    // NgxDocViewerModule,
    SPTermsconditionsModule.forRoot(env),
    BrowserAnimationsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [DataListComponent]
})
export class DataListModule {
  public static forRoot(environment: any): ModuleWithProviders {
    return {
      ngModule: DataListModule,
      providers: [
        {
          provide: 'env', // you can also use InjectionToken
          useValue: environment
        }
      ]
    };
  }
}
