import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { AnnotationService } from '../service/annotation.service';

import { AnnotationComponent } from './annotation.component';

describe('Component Tests', () => {
  describe('Annotation Management Component', () => {
    let comp: AnnotationComponent;
    let fixture: ComponentFixture<AnnotationComponent>;
    let service: AnnotationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [AnnotationComponent],
      })
        .overrideTemplate(AnnotationComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AnnotationComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(AnnotationService);

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
      expect(comp.annotations?.[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
