import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IPlantcategory } from '../plantcategory.model';
import { PlantcategoryService } from '../service/plantcategory.service';

@Component({
  templateUrl: './plantcategory-delete-dialog.component.html',
})
export class PlantcategoryDeleteDialogComponent {
  plantcategory?: IPlantcategory;

  constructor(protected plantcategoryService: PlantcategoryService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.plantcategoryService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
