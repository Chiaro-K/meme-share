import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { AuthService } from './app/services/auth.service';

import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { PostService2 } from './app/services/posts/postService2';

// if (environment.production) {
//   enableProdMode();
// }

bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: FIREBASE_OPTIONS,
      useClass: IonicRouteStrategy,
      useValue: environment.firebase,
    },
    importProvidersFrom(
      IonicModule.forRoot({}),
      provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideFirestore(() => getFirestore())
    ),
    provideRouter(routes),
    AuthService,
    PostService2
  ],
});
