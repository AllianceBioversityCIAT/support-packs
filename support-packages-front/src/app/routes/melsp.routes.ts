// src/routes/melsp.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'melsp',
    loadComponent: () => import('../melsp/melsp.component').then(c => c.MelspComponent),
    children: [
      {
        path: 'melsp',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadComponent: () => import('../melsp/pages/home-mel/home-mel.component').then(mod => mod.HomeMelComponent)
      },
      {
        path: 'overview',
        loadComponent: () => import('../melsp/pages/overview/overview.component').then(mod => mod.OverviewComponent)
      },
      {
        path: 'manage-tool',
        title: 'MELSP - Admin module',
        loadComponent: () => import('../melsp/pages/admin/admin.component').then(mod => mod.AdminComponent)
      },
      {
        path: 'form-request',
        loadComponent: () => import('../melsp/pages/form-request/form-request.component').then(mod => mod.FormRequestComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'melsp/home'
  }
];
