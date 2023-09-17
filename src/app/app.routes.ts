import { Routes } from '@angular/router';
import { AuthGuard } from './services/guards/auth.guard';

// import { redirectUnauthorizedTo, redirectLoggedInTo, canActivate, AuthGuard } from '@angular/fire/auth-guard';
// import { AuthGuard } from './services/firebase/auth.guard';

// const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['signup']);
// const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);
// const redirectLoggedInToProfile = () => redirectLoggedInTo(['tabs/profile']);

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
    // ...canActivate(redirectUnauthorizedToLogin),
    // canActivate: [AuthGuard]
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage),
    // ...canActivate(redirectUnauthorizedToLogin)
    // canActivate: [AuthGuard]
  },
  {
    path: 'search',
    loadComponent: () => import('./pages/search/search.page').then(m => m.SearchPage),
    // ...canActivate(redirectUnauthorizedToLogin)
    // canActivate: [AuthGuard]
  },
  {
    path: 'tabs/profile',
    loadComponent: () => import('./pages/user/profile/profile.page').then(m => m.ProfilePage),
    // ...canActivate(redirectUnauthorizedToLogin)
    // canActivate: [AuthGuard]
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/user/signup/signup.page').then(m => m.SignupPage),
    // ...canActivate(redirectLoggedInToHome)
    // canActivate: [AuthGuard]
    // ...canActivate(redirectLoggedInToProfile)
    // , canActivate: [AuthGuard], data: { authGuardPipe: redirectLoggedInToProfile }
  },
  {
    path: 'view-user',
    loadComponent: () => import('./pages/view-user/view-user.page').then( m => m.ViewUserPage),
    // canActivate: [AuthGuard]
  }
];
