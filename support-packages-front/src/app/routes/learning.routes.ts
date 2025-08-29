// src/routes/learning.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'aiccra',
    loadComponent: () => import('../learning-zone/learning-zone.component').then(c => c.LearningZoneComponent),
    children: [
      {
        path: 'aiccra',
        redirectTo: 'learning-zone',
        pathMatch: 'full'
      },
      {
        path: 'learning-zone',
        loadComponent: () => import('../learning-zone/pages/home-learning/home-learning.component').then(mod => mod.HomeLearningComponent)
      },
      {
        path: 'FAQ',
        loadComponent: () => import('../learning-zone/pages/faq/faq.component').then(mod => mod.FaqComponent)
      },
      {
        path: 'manage-tool',
        loadComponent: () => import('../learning-zone/pages/admin/admin.component').then(mod => mod.AdminComponent)
      },
      {
        path: 'form-request',
        loadComponent: () => import('../learning-zone/pages/form-request/form-request.component').then(mod => mod.FormRequestComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'aiccra/learning-zone'
  }
];
