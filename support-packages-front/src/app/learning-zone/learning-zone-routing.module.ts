import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LearningZoneComponent } from './learning-zone.component';

const routes: Routes = [
  {
    path:'',
    component:LearningZoneComponent,
    children:[
      {
        path:'learning-zone',
        loadChildren: () => import('./pages/home-learning/home-learning.module').then(mod => mod.HomeLearningModule)
      },
      { 
        path: '',
        redirectTo: 'learning-zone',
        pathMatch: 'full'
        //  runGuardsAndResolvers: 'always'
      },
      {
        path:'FAQ',
        loadChildren: () => import('./pages/faq/faq.module').then(mod => mod.FaqModule)
      },
  ]
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearningZoneRoutingModule { }
