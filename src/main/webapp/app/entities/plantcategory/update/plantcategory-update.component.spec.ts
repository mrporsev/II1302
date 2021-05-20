jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { PlantcategoryService } from '../service/plantcategory.service';
import { IPlantcategory, Plantcategory } from '../plantcategory.model';

import { PlantcategoryUpdateComponent } from './plantcategory-update.component';

describe('Component Tests', () => {
  describe('Plantcategory Management Update Component', () => {
    let comp: PlantcategoryUpdateComponent;
    let fixture: ComponentFixture<PlantcategoryUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let plantcategoryService: PlantcategoryService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [PlantcategoryUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(PlantcategoryUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PlantcategoryUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      plantcategoryService = TestBed.inject(PlantcategoryService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const plantcategory: IPlantcategory = { id: 456 };

        activatedRoute.data = of({ plantcategory });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(plantcategory));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const plantcategory = { id: 123 };
        spyOn(plantcategoryService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ plantcategory });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: plantcategory }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(plantcategoryService.update).toHaveBeenCalledWith(plantcategory);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const plantcategory = new Plantcategory();
        spyOn(plantcategoryService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ plantcategory });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: plantcategory }));
        saveSubject.complete();

        // THEN
        expect(plantcategoryService.create).toHaveBeenCalledWith(plantcategory);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const plantcategory = { id: 123 };
        spyOn(plantcategoryService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ plantcategory });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(plantcategoryService.update).toHaveBeenCalledWith(plantcategory);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
