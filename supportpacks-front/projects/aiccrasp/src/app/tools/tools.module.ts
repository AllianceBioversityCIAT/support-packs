import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolsRoutingModule } from './tools-routing.module';
import { ToolsComponent } from './tools.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronLeft, faCoffee, faToggleOff } from '@fortawesome/free-solid-svg-icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SortPipe } from '../pipes/sort.pipe';


@NgModule({
  declarations: [ToolsComponent, SortPipe],
  imports: [
    CommonModule,
    ToolsRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgbModule
  ],
  providers: [SortPipe]
})
export class ToolsModule { 
  constructor(library: FaIconLibrary) {
    library.addIcons(faChevronLeft, faToggleOff, faToggleOff, faCoffee);
  }
}
