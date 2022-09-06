import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SPTermsconditionsComponent } from './sp-termsconditions.component';

@NgModule({
  declarations: [SPTermsconditionsComponent],
  imports: [
    BrowserModule,
    NgxSpinnerModule,
    HttpClientModule,
    // NgModule,
    ReactiveFormsModule,
    FormsModule,
    NgxDocViewerModule,
    BrowserAnimationsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [SPTermsconditionsComponent],
})
export class SPTermsconditionsModule {
  public static forRoot(environment: any): ModuleWithProviders {
    return {
      ngModule: SPTermsconditionsModule,
      providers: [
        {
          provide: 'env', // you can also use InjectionToken
          useValue: environment,
        },
      ],
    };
  }
}
