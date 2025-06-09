import {
  ApplicationConfig,
  runInInjectionContext,
  EnvironmentInjector,
  inject,
  APP_INITIALIZER,
} from '@angular/core';
import { provideZoneChangeDetection } from '@angular/core';

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

import { I18nService } from './core/services/i18n/i18n.service';

export function loadInitialTranslations(i18n: I18nService) {
  return () => {
    const lang =
      typeof window !== 'undefined' && localStorage.getItem('language')
        ? (localStorage.getItem('language') as 'en' | 'ar')
        : 'en';
    return i18n.loadTranslations(lang);
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(),
    provideHttpClient(withInterceptorsFromDi()),
    provideHttpClient(withFetch()),

    I18nService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadInitialTranslations,
      deps: [I18nService],
      multi: true,
    },
  ],
};
