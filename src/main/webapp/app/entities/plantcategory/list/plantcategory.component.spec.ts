import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { PlantcategoryService } from '../service/plantcategory.service';

import { PlantcategoryComponent } from './plantcategory.component';

describe('Component Tests', () => {
  describe('Plantcategory Management Component', () => {
    let comp: PlantcategoryComponent;
    let fixture: ComponentFixture<PlantcategoryComponent>;
    let service: PlantcategoryService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [PlantcategoryComponent],
      })
        .overrideTemplate(PlantcategoryComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PlantcategoryComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(PlantcategoryService);

      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [{ id: 123 }],
            headers,
          })
        )
      );
    });

    it('Should call load all on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.plantcategories?.[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
