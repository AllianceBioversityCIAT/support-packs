import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DmspComponent } from './dmsp.component';

const routes: Routes = [
  {
    path:'',
    component:DmspComponent,
    children: [
      {
        path:'home',
        loadChildren: () => import('./page/tools-results/tools-results.module').then(mod => mod.ToolsResultsModule)
      },
      { 
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
        //  runGuardsAndResolvers: 'always'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DmspRoutingModule { }
