import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PlantcategoryDetailComponent } from './plantcategory-detail.component';

describe('Component Tests', () => {
  describe('Plantcategory Management Detail Component', () => {
    let comp: PlantcategoryDetailComponent;
    let fixture: ComponentFixture<PlantcategoryDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [PlantcategoryDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ plantcategory: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(PlantcategoryDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PlantcategoryDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load plantcategory on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.plantcategory).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
