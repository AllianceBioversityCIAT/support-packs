// src/routes/dmsp.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dmsp',
    loadComponent: () => import('../dmsp/dmsp.component').then(c => c.DmspComponent),
    children: [
      {
        path: 'dmsp',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadComponent: () => import('../dmsp/pages/tools-results/tools-results.component').then(mod => mod.ToolsResultsComponent)
      },
      {
        path: 'manage-tool',
        title: 'DMSP - Admin module',
        loadComponent: () => import('../dmsp/pages/admin/admin.component').then(mod => mod.AdminComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dmsp/home'
  }
];
