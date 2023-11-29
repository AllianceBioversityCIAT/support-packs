import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormRequestComponent } from './form-request.component';

const routes: Routes = [
  {
    path: '',
    component : FormRequestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRequestRoutingModule { }
