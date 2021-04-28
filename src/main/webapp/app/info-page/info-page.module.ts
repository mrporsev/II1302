import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { INFO_ROUTE } from './info-page.route';
import { InfoPageComponent } from './info-page.component';

@NgModule({
  imports: [SharedModule, RouterModule.forRoot([INFO_ROUTE])],
  declarations: [InfoPageComponent],
})
export class InfoPageModule {}
