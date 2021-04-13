import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { AnnotationComponent } from './list/annotation.component';
import { AnnotationDetailComponent } from './detail/annotation-detail.component';
import { AnnotationUpdateComponent } from './update/annotation-update.component';
import { AnnotationDeleteDialogComponent } from './delete/annotation-delete-dialog.component';
import { AnnotationRoutingModule } from './route/annotation-routing.module';

@NgModule({
  imports: [SharedModule, AnnotationRoutingModule],
  declarations: [AnnotationComponent, AnnotationDetailComponent, AnnotationUpdateComponent, AnnotationDeleteDialogComponent],
  entryComponents: [AnnotationDeleteDialogComponent],
})
export class AnnotationModule {}
