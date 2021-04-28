import { Route } from '@angular/router';

import { InfoPageComponent } from 'app/info-page/info-page.component';

export const INFO_ROUTE: Route = {
  path: 'info-page',
  component: InfoPageComponent,
  data: {
    pageTitle: 'info-page',
  },
};
