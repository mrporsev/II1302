jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { AnnotationService } from '../service/annotation.service';
import { IAnnotation, Annotation } from '../annotation.model';
import { ISensor } from 'app/entities/sensor/sensor.model';
import { SensorService } from 'app/entities/sensor/service/sensor.service';

import { AnnotationUpdateComponent } from './annotation-update.component';

describe('Component Tests', () => {
  describe('Annotation Management Update Component', () => {
    let comp: AnnotationUpdateComponent;
    let fixture: ComponentFixture<AnnotationUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let annotationService: AnnotationService;
    let sensorService: SensorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [AnnotationUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(AnnotationUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AnnotationUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      annotationService = TestBed.inject(AnnotationService);
      sensorService = TestBed.inject(SensorService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call Sensor query and add missing value', () => {
        const annotation: IAnnotation = { id: 456 };
        const sensor: ISensor = { id: 46715 };
        annotation.sensor = sensor;

        const sensorCollection: ISensor[] = [{ id: 70003 }];
        spyOn(sensorService, 'query').and.returnValue(of(new HttpResponse({ body: sensorCollection })));
        const additionalSensors = [sensor];
        const expectedCollection: ISensor[] = [...additionalSensors, ...sensorCollection];
        spyOn(sensorService, 'addSensorToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ annotation });
        comp.ngOnInit();

        expect(sensorService.query).toHaveBeenCalled();
        expect(sensorService.addSensorToCollectionIfMissing).toHaveBeenCalledWith(sensorCollection, ...additionalSensors);
        expect(comp.sensorsSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const annotation: IAnnotation = { id: 456 };
        const sensor: ISensor = { id: 48033 };
        annotation.sensor = sensor;

        activatedRoute.data = of({ annotation });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(annotation));
        expect(comp.sensorsSharedCollection).toContain(sensor);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const annotation = { id: 123 };
        spyOn(annotationService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ annotation });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: annotation }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(annotationService.update).toHaveBeenCalledWith(annotation);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const annotation = new Annotation();
        spyOn(annotationService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ annotation });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: annotation }));
        saveSubject.complete();

        // THEN
        expect(annotationService.create).toHaveBeenCalledWith(annotation);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const annotation = { id: 123 };
        spyOn(annotationService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ annotation });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(annotationService.update).toHaveBeenCalledWith(annotation);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackSensorById', () => {
        it('Should return tracked Sensor primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackSensorById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
