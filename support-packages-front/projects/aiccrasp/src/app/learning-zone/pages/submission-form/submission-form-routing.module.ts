import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubmissionFormComponent } from './submission-form.component';

const routes: Routes = [
  {
    path:'',
    component:SubmissionFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubmissionFormRoutingModule { }
