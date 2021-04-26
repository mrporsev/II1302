import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { PLANTCARE_ROUTE } from './plant-care.route';
import { PlantCareComponent } from './plant-care.component';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([PLANTCARE_ROUTE])],
  declarations: [PlantCareComponent],
})
export class LoginModule {}
