import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Bolt, Link2, LucideAngularModule } from 'lucide-angular';

// Import route configurations
import { routes as dmspRoutes } from './routes/dmsp.routes';
import { routes as learningRoutes } from './routes/learning.routes';
import { routes as melspRoutes } from './routes/melsp.routes';

// Import environment to determine which routes to use
import { environment } from '../environments/environment';

export function getAppConfig(): ApplicationConfig {
  // Determine which routes to use based on environment
  let routes;

  switch (environment.app) {
    case 'dmsp':
      routes = dmspRoutes;
      break;
    case 'learning':
      routes = learningRoutes;
      break;
    case 'melsp':
      routes = melspRoutes;
      break;
    default:
      throw new Error('environment.app no configurado (dmsp|learning|melsp)');
  }

  return {
    providers: [
      provideRouter(
        routes,
        withViewTransitions({
          skipInitialTransition: true
        })
      ),
      provideHttpClient(),
      provideAnimations(),
      importProvidersFrom(LucideAngularModule.pick({ Bolt, Link2 }))
    ]
  };
}
