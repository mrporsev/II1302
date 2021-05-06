import { Route } from '@angular/router';

import { FAQComponent } from 'app/faq/faq.component';

export const FAQ_ROUTE: Route = {
  path: 'faq',
  component: FAQComponent,
  data: {
    pageTitle: 'faq',
  },
};
