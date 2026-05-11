// app/app.routes.ts v2.1.4
import { Routes } from '@angular/router';

/**
 * Application routes configuration
 */
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.Home)
  },
  {
    path: 'learn',
    loadComponent: () => import('./pages/learn/learn').then(m => m.Learn)
  }
];
