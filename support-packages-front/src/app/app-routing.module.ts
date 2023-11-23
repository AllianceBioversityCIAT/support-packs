import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      
      { 
          path: 'aiccra',
          loadChildren: () => import('./learning-zone/learning-zone.module').then(mod => mod.LearningZoneModule),
          //  runGuardsAndResolvers: 'always'
      },

      {
        path: 'dmsp',
        loadChildren: () => import('./dmsp/dmsp.module').then(mod => mod.DmspModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
