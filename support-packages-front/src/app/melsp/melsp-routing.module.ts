import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MelspComponent } from './melsp.component';

const routes: Routes = [
  {
    path:'',
    component:MelspComponent,
    children: [
      {
        path:'home',
        loadChildren: () => import('./pages/home-mel/home-mel.module').then(mod => mod.HomeMelModule)
      },
      { 
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
        //  runGuardsAndResolvers: 'always'
      },
      {
        path:'overview',
        loadChildren: () => import('./pages/overview/overview.module').then(mod => mod.OverviewModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MelspRoutingModule { }
