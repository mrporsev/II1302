import { Route } from '@angular/router';

import { PlantCareComponent } from './plant-care.component';

export const PLANTCARE_ROUTE: Route = {
  path: 'plantcare',
  component: PlantCareComponent,
  data: {
    // pageTitle: 'plantcare.title', // This tries to bind to i18n/en/plantcare.title, no such property exists
    pageTitle: 'home.title',
  },
};
