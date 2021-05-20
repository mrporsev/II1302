import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'sensor',
        data: { pageTitle: 'plantalyzerApp.sensor.home.title' },
        loadChildren: () => import('./sensor/sensor.module').then(m => m.SensorModule),
      },

      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
