import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; // ← CHANGEMENT
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(App, {
  providers: [
    provideAnimationsAsync(), // ← Solution : Async au lieu de sync
    provideHttpClient(),
    provideRouter(routes),
  ],
});
