import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PlantcategoryComponent } from '../list/plantcategory.component';
import { PlantcategoryDetailComponent } from '../detail/plantcategory-detail.component';
import { PlantcategoryUpdateComponent } from '../update/plantcategory-update.component';
import { PlantcategoryRoutingResolveService } from './plantcategory-routing-resolve.service';

const plantcategoryRoute: Routes = [
  {
    path: '',
    component: PlantcategoryComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PlantcategoryDetailComponent,
    resolve: {
      plantcategory: PlantcategoryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PlantcategoryUpdateComponent,
    resolve: {
      plantcategory: PlantcategoryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PlantcategoryUpdateComponent,
    resolve: {
      plantcategory: PlantcategoryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(plantcategoryRoute)],
  exports: [RouterModule],
})
export class PlantcategoryRoutingModule {}
