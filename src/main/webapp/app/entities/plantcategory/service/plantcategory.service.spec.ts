import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IPlantcategory, Plantcategory } from '../plantcategory.model';

import { PlantcategoryService } from './plantcategory.service';

describe('Service Tests', () => {
  describe('Plantcategory Service', () => {
    let service: PlantcategoryService;
    let httpMock: HttpTestingController;
    let elemDefault: IPlantcategory;
    let expectedResult: IPlantcategory | IPlantcategory[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(PlantcategoryService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        name: 'AAAAAAA',
        description: 'AAAAAAA',
        example: 'AAAAAAA',
        moisture_max: 0,
        moisture_min: 0,
        light_max: 0,
        light_min: 0,
        humidity_max: 0,
        humidity_min: 0,
        temperature_max: 0,
        temperature_min: 0,
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Plantcategory', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Plantcategory()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Plantcategory', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            name: 'BBBBBB',
            description: 'BBBBBB',
            example: 'BBBBBB',
            moisture_max: 1,
            moisture_min: 1,
            light_max: 1,
            light_min: 1,
            humidity_max: 1,
            humidity_min: 1,
            temperature_max: 1,
            temperature_min: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Plantcategory', () => {
        const patchObject = Object.assign(
          {
            example: 'BBBBBB',
            moisture_max: 1,
            moisture_min: 1,
            light_max: 1,
            light_min: 1,
            humidity_min: 1,
            temperature_max: 1,
            temperature_min: 1,
          },
          new Plantcategory()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Plantcategory', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            name: 'BBBBBB',
            description: 'BBBBBB',
            example: 'BBBBBB',
            moisture_max: 1,
            moisture_min: 1,
            light_max: 1,
            light_min: 1,
            humidity_max: 1,
            humidity_min: 1,
            temperature_max: 1,
            temperature_min: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Plantcategory', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addPlantcategoryToCollectionIfMissing', () => {
        it('should add a Plantcategory to an empty array', () => {
          const plantcategory: IPlantcategory = { id: 123 };
          expectedResult = service.addPlantcategoryToCollectionIfMissing([], plantcategory);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(plantcategory);
        });

        it('should not add a Plantcategory to an array that contains it', () => {
          const plantcategory: IPlantcategory = { id: 123 };
          const plantcategoryCollection: IPlantcategory[] = [
            {
              ...plantcategory,
            },
            { id: 456 },
          ];
          expectedResult = service.addPlantcategoryToCollectionIfMissing(plantcategoryCollection, plantcategory);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Plantcategory to an array that doesn't contain it", () => {
          const plantcategory: IPlantcategory = { id: 123 };
          const plantcategoryCollection: IPlantcategory[] = [{ id: 456 }];
          expectedResult = service.addPlantcategoryToCollectionIfMissing(plantcategoryCollection, plantcategory);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(plantcategory);
        });

        it('should add only unique Plantcategory to an array', () => {
          const plantcategoryArray: IPlantcategory[] = [{ id: 123 }, { id: 456 }, { id: 99116 }];
          const plantcategoryCollection: IPlantcategory[] = [{ id: 123 }];
          expectedResult = service.addPlantcategoryToCollectionIfMissing(plantcategoryCollection, ...plantcategoryArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const plantcategory: IPlantcategory = { id: 123 };
          const plantcategory2: IPlantcategory = { id: 456 };
          expectedResult = service.addPlantcategoryToCollectionIfMissing([], plantcategory, plantcategory2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(plantcategory);
          expect(expectedResult).toContain(plantcategory2);
        });

        it('should accept null and undefined values', () => {
          const plantcategory: IPlantcategory = { id: 123 };
          expectedResult = service.addPlantcategoryToCollectionIfMissing([], null, plantcategory, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(plantcategory);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
