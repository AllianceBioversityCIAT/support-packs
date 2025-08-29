// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';

// Import the main AppComponent and configuration
import { AppComponent } from './app/app.component';
import { getAppConfig } from './app/app.config';

// Bootstrap the application with the appropriate configuration
bootstrapApplication(AppComponent, getAppConfig()).catch(err => console.error(err));
