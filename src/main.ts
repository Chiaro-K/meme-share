import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';

import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { PostService } from './app/services/posts/postService';
import { provideAuth, getAuth } from '@angular/fire/auth';

import { Capacitor } from '@capacitor/core';
import { indexedDBLocalPersistence, initializeAuth } from 'firebase/auth';
import { getApp } from 'firebase/app';
import { AvatarService } from './app/services/avatar.service';

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
      provideFirestore(() => getFirestore()),
      provideStorage(() => getStorage()),
      provideAuth(() => {
        // if (Capacitor.isNativePlatform()) {
        //   return initializeAuth(getApp(), {
        //     persistence: indexedDBLocalPersistence
        //   });
        // } else {
          return getAuth();
        // }
      }),
    ),
    provideRouter(routes),
    PostService,
    AvatarService,
    Storage
  ],
});
