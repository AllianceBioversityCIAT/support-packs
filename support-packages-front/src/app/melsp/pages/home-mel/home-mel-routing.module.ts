import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeMelComponent } from './home-mel.component';

const routes: Routes = [
  {
    path:'',
    component:HomeMelComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeMelRoutingModule { }
