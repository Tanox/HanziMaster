// app/main.ts v2.1.4
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app.config';
import { App } from './app';

/**
 * Bootstrap the Angular application with zoneless change detection
 */
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
