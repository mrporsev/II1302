import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import * as dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IAnnotation, Annotation } from '../annotation.model';
import { AnnotationService } from '../service/annotation.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { ISensor } from 'app/entities/sensor/sensor.model';
import { SensorService } from 'app/entities/sensor/service/sensor.service';

@Component({
  selector: 'jhi-annotation-update',
  templateUrl: './annotation-update.component.html',
})
export class AnnotationUpdateComponent implements OnInit {
  isSaving = false;

  sensorsSharedCollection: ISensor[] = [];

  editForm = this.fb.group({
    id: [],
    smiley: [null, [Validators.required]],
    textBox: [null, [Validators.required]],
    date: [null, [Validators.required]],
    sensor: [],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected annotationService: AnnotationService,
    protected sensorService: SensorService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ annotation }) => {
      if (annotation.id === undefined) {
        const today = dayjs().startOf('day');
        annotation.date = today;
      }

      this.updateForm(annotation);

      this.loadRelationshipsOptions();
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(
          new EventWithContent<AlertError>('plantalyzerApp.error', { ...err, key: 'error.file.' + err.key })
        ),
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const annotation = this.createFromForm();
    if (annotation.id !== undefined) {
      this.subscribeToSaveResponse(this.annotationService.update(annotation));
    } else {
      this.subscribeToSaveResponse(this.annotationService.create(annotation));
    }
  }

  trackSensorById(index: number, item: ISensor): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAnnotation>>): void {
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

  protected updateForm(annotation: IAnnotation): void {
    this.editForm.patchValue({
      id: annotation.id,
      smiley: annotation.smiley,
      textBox: annotation.textBox,
      date: annotation.date ? annotation.date.format(DATE_TIME_FORMAT) : null,
      sensor: annotation.sensor,
    });

    this.sensorsSharedCollection = this.sensorService.addSensorToCollectionIfMissing(this.sensorsSharedCollection, annotation.sensor);
  }

  protected loadRelationshipsOptions(): void {
    this.sensorService
      .query()
      .pipe(map((res: HttpResponse<ISensor[]>) => res.body ?? []))
      .pipe(map((sensors: ISensor[]) => this.sensorService.addSensorToCollectionIfMissing(sensors, this.editForm.get('sensor')!.value)))
      .subscribe((sensors: ISensor[]) => (this.sensorsSharedCollection = sensors));
  }

  protected createFromForm(): IAnnotation {
    return {
      ...new Annotation(),
      id: this.editForm.get(['id'])!.value,
      smiley: this.editForm.get(['smiley'])!.value,
      textBox: this.editForm.get(['textBox'])!.value,
      date: this.editForm.get(['date'])!.value ? dayjs(this.editForm.get(['date'])!.value, DATE_TIME_FORMAT) : undefined,
      sensor: this.editForm.get(['sensor'])!.value,
    };
  }
}
