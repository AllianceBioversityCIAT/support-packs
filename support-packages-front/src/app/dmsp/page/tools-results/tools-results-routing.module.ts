import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToolsResultsComponent } from './tools-results.component';

const routes: Routes = [{
  path:'',
  component:ToolsResultsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToolsResultsRoutingModule { }
