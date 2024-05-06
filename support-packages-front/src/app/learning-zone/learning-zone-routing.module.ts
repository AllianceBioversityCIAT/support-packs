import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LearningZoneComponent } from './learning-zone.component';

const routes: Routes = [
  {
    path: '',
    component: LearningZoneComponent,
    title: 'Learning Zone - AICCRA',
    children: [
      {
        path: 'learning-zone',
        loadChildren: () =>
          import('./pages/home-learning/home-learning.module').then(
            (mod) => mod.HomeLearningModule,
          ),
      },
      {
        path: '',
        redirectTo: 'learning-zone',
        pathMatch: 'full',
      },
      {
        path: 'FAQ',
        loadChildren: () => import('./pages/faq/faq.module').then((mod) => mod.FaqModule),
      },

      {
        path: 'manage-tool',
        loadChildren: () => import('./pages/admin/admin.module').then((mod) => mod.AdminModule),
      },

      {
        path: 'form-request',
        loadChildren: () =>
          import('./pages/form-request/form-request.module').then((mod) => mod.FormRequestModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LearningZoneRoutingModule {}
