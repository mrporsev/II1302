import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPlantcategory } from '../plantcategory.model';

@Component({
  selector: 'jhi-plantcategory-detail',
  templateUrl: './plantcategory-detail.component.html',
})
export class PlantcategoryDetailComponent implements OnInit {
  plantcategory: IPlantcategory | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ plantcategory }) => {
      this.plantcategory = plantcategory;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
