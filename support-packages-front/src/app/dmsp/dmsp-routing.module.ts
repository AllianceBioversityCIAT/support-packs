import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DmspComponent } from './dmsp.component';

const routes: Routes = [
  {
    path: '',
    component: DmspComponent,
    title: 'Data Management Support Pack',
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./page/tools-results/tools-results.module').then((mod) => mod.ToolsResultsModule),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },

      {
        path: 'overview',
        loadChildren: () =>
          import('./page/overview/overview.module').then((mod) => mod.OverviewModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DmspRoutingModule {}
