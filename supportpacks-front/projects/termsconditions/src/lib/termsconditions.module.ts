import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TermsconditionsComponent } from './termsconditions.component';

@NgModule({
  declarations: [TermsconditionsComponent],
  imports: [
    BrowserModule,
    NgxSpinnerModule,
    HttpClientModule,
    // NgModule,
    ReactiveFormsModule,
    FormsModule,
    // NgxDocViewerModule,
    BrowserAnimationsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [TermsconditionsComponent]
})
export class TermsconditionsModule {
  public static forRoot(environment: any): ModuleWithProviders {

    return {
      ngModule: TermsconditionsModule,
      providers: [
        {
          provide: 'env', // you can also use InjectionToken
          useValue: environment
        }
      ]
    };
  }
}
