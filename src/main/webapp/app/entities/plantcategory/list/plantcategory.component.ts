import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPlantcategory } from '../plantcategory.model';
import { PlantcategoryService } from '../service/plantcategory.service';
import { PlantcategoryDeleteDialogComponent } from '../delete/plantcategory-delete-dialog.component';

@Component({
  selector: 'jhi-plantcategory',
  templateUrl: './plantcategory.component.html',
})
export class PlantcategoryComponent implements OnInit {
  plantcategories?: IPlantcategory[];
  isLoading = false;

  constructor(protected plantcategoryService: PlantcategoryService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.plantcategoryService.query().subscribe(
      (res: HttpResponse<IPlantcategory[]>) => {
        this.isLoading = false;
        this.plantcategories = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IPlantcategory): number {
    return item.id!;
  }

  /*delete(plantcategory: IPlantcategory): void {
    const modalRef = this.modalService.open(PlantcategoryDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.plantcategory = plantcategory;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }*/
}
