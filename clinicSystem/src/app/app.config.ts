import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';

import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import {
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideTranslateService } from '@ngx-translate/core';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(),
    provideHttpClient(withInterceptorsFromDi()),
    provideHttpClient(withFetch()),
    provideTranslateService(),

  ],
};
