jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { InfoService } from '../service/info.service';
import { IInfo, Info } from '../info.model';

import { InfoUpdateComponent } from './info-update.component';

describe('Component Tests', () => {
  describe('Info Management Update Component', () => {
    let comp: InfoUpdateComponent;
    let fixture: ComponentFixture<InfoUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let infoService: InfoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [InfoUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(InfoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(InfoUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      infoService = TestBed.inject(InfoService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const info: IInfo = { id: 456 };

        activatedRoute.data = of({ info });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(info));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const info = { id: 123 };
        spyOn(infoService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ info });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: info }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(infoService.update).toHaveBeenCalledWith(info);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const info = new Info();
        spyOn(infoService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ info });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: info }));
        saveSubject.complete();

        // THEN
        expect(infoService.create).toHaveBeenCalledWith(info);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const info = { id: 123 };
        spyOn(infoService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ info });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(infoService.update).toHaveBeenCalledWith(info);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
