import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { AnnotationComponent } from '../list/annotation.component';
import { AnnotationDetailComponent } from '../detail/annotation-detail.component';
import { AnnotationUpdateComponent } from '../update/annotation-update.component';
import { AnnotationRoutingResolveService } from './annotation-routing-resolve.service';

const annotationRoute: Routes = [
  {
    path: '',
    component: AnnotationComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AnnotationDetailComponent,
    resolve: {
      annotation: AnnotationRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AnnotationUpdateComponent,
    resolve: {
      annotation: AnnotationRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AnnotationUpdateComponent,
    resolve: {
      annotation: AnnotationRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(annotationRoute)],
  exports: [RouterModule],
})
export class AnnotationRoutingModule {}
