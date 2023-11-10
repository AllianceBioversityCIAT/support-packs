import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'aiccrasp',
    children: [
      { 
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
        //  runGuardsAndResolvers: 'always'
      },
      { 
          path: 'home',
          loadChildren: () => import('./learning-zone/learning-zone.module').then(mod => mod.LearningZoneModule),
          //  runGuardsAndResolvers: 'always'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
