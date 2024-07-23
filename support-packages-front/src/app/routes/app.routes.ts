import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../app.component').then((m) => m.AppComponent),
    children: [
      {
        path: '',
        redirectTo: 'aiccra/learning-zone',
        pathMatch: 'full',
      },
      {
        path: 'aiccra',
        loadComponent: () =>
          import('../learning-zone/learning-zone.component').then((c) => c.LearningZoneComponent),
        children: [
          {
            path: 'learning-zone',
            loadComponent: () =>
              import('../learning-zone/pages/home-learning/home-learning.component').then(
                (mod) => mod.HomeLearningComponent,
              ),
          },
          {
            path: '',
            redirectTo: 'learning-zone',
            pathMatch: 'full',
          },
          {
            path: 'FAQ',
            loadComponent: () =>
              import('../learning-zone/pages/faq/faq.component').then((mod) => mod.FaqComponent),
          },

          {
            path: 'manage-tool',
            loadComponent: () =>
              import('../learning-zone/pages/admin/admin.component').then(
                (mod) => mod.AdminComponent,
              ),
          },

          {
            path: 'form-request',
            loadComponent: () =>
              import('../learning-zone/pages/form-request/form-request.component').then(
                (mod) => mod.FormRequestComponent,
              ),
          },
        ],
      },
      {
        path: 'dmsp',
        loadComponent: () => import('../dmsp/dmsp.component').then((c) => c.DmspComponent),
        children: [
          {
            path: 'home',
            loadComponent: () =>
              import('../dmsp/page/tools-results/tools-results.component').then(
                (mod) => mod.ToolsResultsComponent,
              ),
          },
          {
            path: '',
            redirectTo: 'home',
            pathMatch: 'full',
          },
        ],
      },
      {
        path: 'melsp',
        loadComponent: () => import('../melsp/melsp.component').then((c) => c.MelspComponent),
        children: [
          {
            path: 'home',
            loadComponent: () =>
              import('../melsp/pages/home-mel/home-mel.component').then(
                (mod) => mod.HomeMelComponent,
              ),
          },
          {
            path: '',
            redirectTo: 'home',
            pathMatch: 'full',
          },
          {
            path: 'overview',
            loadComponent: () =>
              import('../melsp/pages/overview/overview.component').then(
                (mod) => mod.OverviewComponent,
              ),
          },
          {
            path: 'manage-tool',
            title: 'MELSP - Admin module',
            loadComponent: () =>
              import('../melsp/pages/admin/admin.component').then((mod) => mod.AdminComponent),
          },
        ],
      },
    ],
  },
];
