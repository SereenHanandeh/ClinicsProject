import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app/app.component';

export const appConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),
  
  ],
};

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
