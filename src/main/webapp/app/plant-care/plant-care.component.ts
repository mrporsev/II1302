import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plantcategory } from 'app/entities/plantcategory/plantcategory.model';
import { PlantcategoryService } from 'app/entities/plantcategory/service/plantcategory.service';

// Not needed, as database connection is only mocked
// import { Observable } from 'rxjs/internal/Observable';
// import { EntityResponseType, EntityArrayResponseType } from 'app/entities/plantcategory/service/plantcategory.service';

@Component({
  selector: 'jhi-plant-care',
  templateUrl: './plant-care.component.html',
  styleUrls: ['./plant-care.component.scss'],
})
export class PlantCareComponent implements OnInit {
  // testCategories: Observable<EntityArrayResponseType> | undefined;

  testCategories: Array<Plantcategory> | undefined;
  categories: Plantcategory[] | undefined;

  constructor(private categoryService: PlantcategoryService, private router: Router) {}

  // fetches all PlantCategory items from database. As database connection could not be properly authoritized, categoryService.getAllHardcoded() will fetch hardcoded PlantCategory items
  ngOnInit(): void {
    this.testCategories = this.categoryService.getAllHardcoded();
  }
}
