import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from '../services/firebase/auth.guard';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('../pages/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'search',
        loadComponent: () =>
          import('../pages/search/search.page').then((m) => m.SearchPage),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('../pages/user/profile/profile.page').then((m) => m.ProfilePage),
          canActivate: [AuthGuard]
      },
      {
        path: 'signup',
        loadComponent: () =>
          import('../pages/user/signup/signup.page').then((m) => m.SignupPage),
          canActivate: [AuthGuard]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
];
