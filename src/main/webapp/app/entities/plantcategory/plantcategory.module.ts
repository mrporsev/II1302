import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { PlantcategoryComponent } from './list/plantcategory.component';
import { PlantcategoryDetailComponent } from './detail/plantcategory-detail.component';
import { PlantcategoryUpdateComponent } from './update/plantcategory-update.component';
import { PlantcategoryDeleteDialogComponent } from './delete/plantcategory-delete-dialog.component';
import { PlantcategoryRoutingModule } from './route/plantcategory-routing.module';

@NgModule({
  imports: [SharedModule, PlantcategoryRoutingModule],
  declarations: [PlantcategoryComponent, PlantcategoryDetailComponent, PlantcategoryUpdateComponent, PlantcategoryDeleteDialogComponent],
  entryComponents: [PlantcategoryDeleteDialogComponent],
})
export class PlantcategoryModule {}
