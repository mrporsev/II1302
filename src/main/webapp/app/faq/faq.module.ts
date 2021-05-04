import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { FAQ_ROUTE } from './faq.route';
import { FAQComponent } from './faq.component';

@NgModule({
  imports: [SharedModule, RouterModule.forRoot([FAQ_ROUTE])],
  declarations: [FAQComponent],
})
export class FaqModule {}
