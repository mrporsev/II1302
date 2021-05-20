import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IPlantcategory, Plantcategory } from '../plantcategory.model';
import { PlantcategoryService } from '../service/plantcategory.service';

@Component({
  selector: 'jhi-plantcategory-update',
  templateUrl: './plantcategory-update.component.html',
})
export class PlantcategoryUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    description: [],
    example: [],
    moisture_max: [],
    moisture_min: [],
    light_max: [],
    light_min: [],
    humidity_max: [],
    humidity_min: [],
    temperature_max: [],
    temperature_min: [],
  });

  constructor(protected plantcategoryService: PlantcategoryService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ plantcategory }) => {
      this.updateForm(plantcategory);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const plantcategory = this.createFromForm();
    if (plantcategory.id !== undefined) {
      this.subscribeToSaveResponse(this.plantcategoryService.update(plantcategory));
    } else {
      this.subscribeToSaveResponse(this.plantcategoryService.create(plantcategory));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlantcategory>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(plantcategory: IPlantcategory): void {
    this.editForm.patchValue({
      id: plantcategory.id,
      name: plantcategory.name,
      description: plantcategory.description,
      example: plantcategory.example,
      moisture_max: plantcategory.moisture_max,
      moisture_min: plantcategory.moisture_min,
      light_max: plantcategory.light_max,
      light_min: plantcategory.light_min,
      humidity_max: plantcategory.humidity_max,
      humidity_min: plantcategory.humidity_min,
      temperature_max: plantcategory.temperature_max,
      temperature_min: plantcategory.temperature_min,
    });
  }

  protected createFromForm(): IPlantcategory {
    return {
      ...new Plantcategory(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
      example: this.editForm.get(['example'])!.value,
      moisture_max: this.editForm.get(['moisture_max'])!.value,
      moisture_min: this.editForm.get(['moisture_min'])!.value,
      light_max: this.editForm.get(['light_max'])!.value,
      light_min: this.editForm.get(['light_min'])!.value,
      humidity_max: this.editForm.get(['humidity_max'])!.value,
      humidity_min: this.editForm.get(['humidity_min'])!.value,
      temperature_max: this.editForm.get(['temperature_max'])!.value,
      temperature_min: this.editForm.get(['temperature_min'])!.value,
    };
  }
}
