import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


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
      loadChildren: () => import('./home/home.module').then(mod => mod.HomeModule),
      //  runGuardsAndResolvers: 'always'
      },
      { 
      path: 'tools',
      loadChildren: () => import('./tools/tools.module').then(mod => mod.ToolsModule),
      //  runGuardsAndResolvers: 'always'
      },
    ]
  },
  // { path: 'resources', component: ResourcesComponent },
  { path: '', redirectTo: 'aiccrasp', pathMatch: 'full' },
  { path: '**', redirectTo: 'aiccrasp', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
